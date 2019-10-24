<template>

</template>


<script>

export default {
  mounted() {
    console.log(this.searchTerm)
  },
  data() {
    return {
      author: '',
      era: null,
      eras: ['The Old Republic', 'Prequel', 'Clone Wars', 'Early Empire', 'Rebellion', 'Post Endor', 'New Republic']

    }
  },
  props: {
    searchTerm: String
  }
}
</script>

<style>

</style>
