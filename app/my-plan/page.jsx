import { Suspense } from "react";
import MyPlan from "@/components/MyPlan";
import { fetchWorkouts } from "@/lib/api";

export const metadata = {
  title: "My Plan",
  description: "Today's plan and saved lifts, with live totals for exercises, minutes and calories.",
};

async function PlanWithData() {
  try {
    const workouts = await fetchWorkouts();
    return <MyPlan workouts={workouts} />;
  } catch (err) {
    return <MyPlan error={err.message} />;
  }
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<MyPlan loading />}>
      <PlanWithData />
    </Suspense>
  );
}
