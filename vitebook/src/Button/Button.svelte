<script>
  export let disabled = false;
</script>

<button {disabled} on:click><slot /></button>

<style>
  button {
    background: burlywood;
    color: black;
    padding: 1rem 3rem;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background: #ffcc00;
  }
</style>
