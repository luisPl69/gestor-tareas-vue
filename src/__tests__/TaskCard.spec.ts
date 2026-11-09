import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TaskCard from "../components/tasks/TaskCard.vue";
import type { Task } from "../types/task";

const tareaBase: Task = {
  id: "1",
  title: "Estudiar Vue",
  description: "Aprender componentes y props",
  completed: false,
};

function montar(task: Task = tareaBase) {
  return mount(TaskCard, {
    props: { task },
    global: {
      stubs: { RouterLink: true },
    },
  });
}

describe("TaskCard", () => {
  it("muestra título, descripción y estado pendiente", () => {
    const wrapper = montar();

    expect(wrapper.get("h3").text()).toBe("Estudiar Vue");
    expect(wrapper.text()).toContain("Aprender componentes y props");
    expect(wrapper.get("span").text()).toBe("Pendiente");
    expect(wrapper.get("h3").classes()).not.toContain("completed");
  });

  it("aplica el estilo de completada cuando completed es true", () => {
    const wrapper = montar({ ...tareaBase, completed: true });

    expect(wrapper.get("h3").classes()).toContain("completed");
    expect(wrapper.get("span").text()).toBe("Completada");
    expect(wrapper.get("button:nth-of-type(1)").text()).toBe("Desmarcar");
  });

  it("emite toggle, edit y delete con el dato correcto", async () => {
    const wrapper = montar();

    await wrapper.get("button:nth-of-type(1)").trigger("click");
    await wrapper.get("button:nth-of-type(2)").trigger("click");
    await wrapper.get("button:nth-of-type(3)").trigger("click");

    expect(wrapper.emitted("toggle")?.[0]).toEqual(["1"]);
    expect(wrapper.emitted("edit")?.[0]).toEqual([tareaBase]);
    expect(wrapper.emitted("delete")?.[0]).toEqual(["1"]);
  });
});