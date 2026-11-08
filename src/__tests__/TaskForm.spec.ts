import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TaskForm from "../components/tasks/TaskForm.vue";

describe("TaskForm", () => {
  it("emite save con los datos limpios (trim) y completed en false", async () => {
    const wrapper = mount(TaskForm);

    await wrapper.get("#title").setValue("  Estudiar Pinia  ");
    await wrapper.get("#description").setValue("Store con setup");
    await wrapper.get("form").trigger("submit");

    expect(wrapper.emitted("save")?.[0]).toEqual([
      { title: "Estudiar Pinia", description: "Store con setup", completed: false },
    ]);
    expect((wrapper.get("#title").element as HTMLInputElement).value).toBe("");
  });

  it("no emite save si el título está vacío", async () => {
    const wrapper = mount(TaskForm);

    await wrapper.get("#title").setValue("   ");
    await wrapper.get("form").trigger("submit");

    expect(wrapper.emitted("save")).toBeUndefined();
  });

  it("en modo edición carga los datos y permite cancelar", async () => {
    const wrapper = mount(TaskForm, {
      props: {
        task: { id: "2", title: "Realizar deber", description: "Completar el trabajo", completed: true },
      },
    });

    expect(wrapper.get("h2").text()).toBe("Editar tarea");
    expect((wrapper.get("#title").element as HTMLInputElement).value).toBe("Realizar deber");

    await wrapper.get('button[type="button"]').trigger("click");
    expect(wrapper.emitted("cancel")).toHaveLength(1);
  });
});