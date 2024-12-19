import React, { Suspense } from "react";
import UpdatePromptComp from "@/components/UpdatePromptComp";

const UpdatePrompt = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePromptComp />
    </Suspense>
  );
};

export default UpdatePrompt;
