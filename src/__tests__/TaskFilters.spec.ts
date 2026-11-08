import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TaskFilters from "../components/tasks/TaskFilters.vue";

describe("TaskFilters", () => {
  it("marca como activo el filtro recibido por v-model", () => {
    const wrapper = mount(TaskFilters, { props: { modelValue: "pending" } });

    expect(wrapper.get("button:nth-of-type(2)").classes()).toContain("active");
    expect(wrapper.get("button:nth-of-type(1)").classes()).not.toContain("active");
  });

  it("emite update:modelValue al pulsar Completadas", async () => {
    const wrapper = mount(TaskFilters, { props: { modelValue: "all" } });

    await wrapper.get("button:nth-of-type(3)").trigger("click");

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["completed"]);
  });
});