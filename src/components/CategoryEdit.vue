<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">Название</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
            Введите название категории
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">Лимит</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >
            Минимальное значение: {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import { minValue, required } from 'vuelidate/lib/validators';

  export default {
    name: 'CategoryEdit',
    data: () => ({
      select: null,
      title: "",
      limit: 100,
      current: null
    }),
    validations: {
      title: { required },
      limit: { minValue: minValue(100) }
    },
    watch: {
      current(value) {
        this.current = value;
        const {title, limit} = this.categories.find(cat => cat.id === value);
        this.title = title;
        this.limit = limit
      }
    },
    props: {
      categories: {
        type: Array,
        required: true
      }
    },
    methods: {
      async handleSubmit() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return
        }

        try {
          const categoryData = {
            id: this.current,
            title: this.title,
            limit: this.limit
          };
          await this.$store.dispatch("updateCategory", categoryData);
          this.$message("Категория успешно обновлена");
          this.$emit("updated", categoryData)
        } catch (e) {}
      }
    },
    created() {
      const {id, title, limit} = this.categories[0];
      this.current = id;
      this.title = title;
      this.limit = limit
    },
    mounted() {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields()
    },
    beforeDestroy() {
      if (this.select && this.select.destroy) {
        this.select.destroy()
      }
    }
  };
</script>

<style scoped>

</style>
