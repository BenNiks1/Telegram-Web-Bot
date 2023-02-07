<template>
  <nav>
    <RouterLink to="/">Главная</RouterLink>
    <RouterLink to="/calendar">Календарь</RouterLink>
  </nav>

  <div class="radio-btn-group">
    <div class="radio">
      <input
        id="click_me"
        v-model="checked"
        type="radio"
        name="radio"
        value="click_me"
        checked
      />
      <label for="click_me"> Click Me </label>
    </div>
    <div class="radio">
      <input
        id="or_me"
        v-model="checked"
        type="radio"
        name="radio"
        value="or_me"
        checked
      />
      <label for="or_me"> Or me </label>
    </div>
    <button>Подтвердить</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  // const userData = store.dispatch("userData");
  console.log("userData", store.state);
}),
  console.log("asdasdasdasd");
const checked = ref(null);
</script>

<style lang="scss">
.radio-btn-group {
  display: flex;

  .radio {
    margin: 0 0.25rem;

    label {
      background: #fff;
      border: 1px solid #ddd;
      padding: 0.5rem 1.25rem;
      border-radius: 5px;
      cursor: pointer;
      color: #444;
      transition: box-shadow 400ms ease;

      &:hover {
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
          0 2px 10px 0 rgba(0, 0, 0, 0.12);
      }
    }

    input[type="radio"] {
      display: none;
    }

    input[type="radio"]:checked + label {
      background: #2196f3;
      color: #fff;
      border-color: #2196f3;
    }
  }
}

// other styles
.show {
  font-weight: 400;
  color: #444;

  span {
    background: #f5f5f5;
    color: #f44336;
    border-radius: 3px;
    padding: 0.25rem 0.5rem;
    font-size: 1.25rem;
    border: 1px solid #f1f1f1;
  }
}
</style>
