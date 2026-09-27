"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export const PLAN_CAP = 5;
const STORAGE_KEY = "fitlog:v1";
const EMPTY = { plan: [], saved: [], done: [] };

const PlanContext = createContext(null);

function readStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return {
      plan: Array.isArray(parsed.plan) ? parsed.plan : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
      done: Array.isArray(parsed.done) ? parsed.done : [],
    };
  } catch {
    return EMPTY;
  }
}

export function PlanProvider({ children }) {
  const [state, setState] = useState(EMPTY);
  const [hydrated, setHydrated] = useState(false);


  useEffect(() => {
    setState(readStorage());
    setHydrated(true);

  
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setState(readStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
     
    }
  }, [state, hydrated]);

  const isInPlan = useCallback((id) => state.plan.includes(id), [state.plan]);
  const isSaved = useCallback((id) => state.saved.includes(id), [state.saved]);
  const isDone = useCallback((id) => state.done.includes(id), [state.done]);
  const planIsFull = state.plan.length >= PLAN_CAP;

  const addToPlan = useCallback(
    (workout) => {
      if (state.plan.includes(workout.id)) {
        toast.info(`${workout.name} is already in today's plan`);
        return;
      }
      if (state.plan.length >= PLAN_CAP) {
        toast.error(`Today's plan is full (${PLAN_CAP} lifts). Finish or remove one first.`);
        return;
      }
      setState((s) => ({ ...s, plan: [...s.plan, workout.id] }));
      toast.success("Added to today's plan", { description: workout.name });
    },
    [state.plan]
  );

  const toggleSaved = useCallback(
    (workout) => {
      if (state.saved.includes(workout.id)) {
        setState((s) => ({ ...s, saved: s.saved.filter((id) => id !== workout.id) }));
        toast("Removed from saved", { description: workout.name });
        return;
      }
      setState((s) => ({ ...s, saved: [...s.saved, workout.id] }));
      toast.success("Saved for later", { description: workout.name });
    },
    [state.saved]
  );

  const removeFromPlan = useCallback((workout) => {
    setState((s) => ({
      ...s,
      plan: s.plan.filter((id) => id !== workout.id),
      done: s.done.filter((id) => id !== workout.id),
    }));
    toast("Removed from today's plan", { description: workout.name });
  }, []);

  const removeFromSaved = useCallback((workout) => {
    setState((s) => ({ ...s, saved: s.saved.filter((id) => id !== workout.id) }));
    toast("Removed from saved", { description: workout.name });
  }, []);

  const markDone = useCallback(
    (workout) => {
      if (state.done.includes(workout.id)) return;
      setState((s) => ({ ...s, done: [...s.done, workout.id] }));
      toast.success("Marked as done", { description: `${workout.name}. Nice work.` });
    },
    [state.done]
  );

  const value = useMemo(
    () => ({
      hydrated,
      planIds: state.plan,
      savedIds: state.saved,
      doneIds: state.done,
      planCount: state.plan.length,
      savedCount: state.saved.length,
      planIsFull,
      isInPlan,
      isSaved,
      isDone,
      addToPlan,
      toggleSaved,
      removeFromPlan,
      removeFromSaved,
      markDone,
    }),
    [hydrated, state, planIsFull, isInPlan, isSaved, isDone, addToPlan, toggleSaved, removeFromPlan, removeFromSaved, markDone]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}
