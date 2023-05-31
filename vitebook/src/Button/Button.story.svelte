<script lang="ts" context="module">
  import type { PageMeta } from "@vitebook/client";

  export const __pageMeta: PageMeta = {
    title: "Button",
    description: "My awesome button.",
  };
</script>

<script>
  import { Variant } from "@vitebook/client";
  import {
    ControlsAddon,
    EventsAddon,
    eventCallback,
  } from "@vitebook/client/addons";
  import Button from "./Button.svelte";

  let title = "Click Me";
  let disabled = false;
</script>

<Variant name="Default" description="The default button.">
  <Button {disabled} on:click={eventCallback}>{title}</Button>
</Variant>

<Variant
  name="Disabled"
  description="The disabled button."
  on:enter={() => {
    disabled = true;
  }}
  on:exit={() => {
    disabled = false;
  }}
>
  <Button {disabled}>{title}</Button>
</Variant>

<ControlsAddon>
  <div class="controls">
    <label>
      <span>Titre</span> <input type="text" bind:value={title} />
    </label>
    <label style="margin-top: 24px;">
      <span>Disabled </span><input type="checkbox" bind:checked={disabled} />
    </label>
  </div>
</ControlsAddon>

<EventsAddon />

<style>
  div.controls {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  div.controls > label {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  div.controls > label > span {
    font-size: 0.8rem;
    color: #888;
  }
</style>
