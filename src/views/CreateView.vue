<script>

import axios from "axios";

export default {
    name: "CreateView",

    data() {
        return {
            'base_API': 'http://127.0.0.1:3000/',
            'categories_path': 'categories',
            'error': null,
            'categories': null,
            'title': null,
            'content': null,
            'published': false,
            'categoryId': false,
            'success':false
        }
    },
    components: {

    },
    methods: {
        getcategories(url) {
            axios.get(url).then(response => {
                this.categories = response.data;
                console.log(this.categories);

            }).catch(error => {
                console.log(error);
                this.error = error.message
            })
        },
        submitForm() {
            const data = {
                title: this.title,
                content: this.content,
                published: this.published,
                categoryId: this.categoryId,
            }
            this.errors = {}
            axios.post('http://localhost:3000/posts', data).then(response => {
                console.log(response);
                if (!response.data) {
                    this.errors = response.data.error
                } else {
                    this.title = ''
                    this.content = ''
                    this.published = 'false'
                    this.categoryId = ''
                    this.success = true

                }
                this.loading = false;

            }).catch(err => {
                console.log(err);
                this.error = err.message
            })
        }
    },
    mounted() {
        const url = this.base_API + this.categories_path;
        this.getcategories(url)

    }

}
</script>
<template>
    <section class="index_section position-relative h-100">

        <div class="add_post position-fixed end-0 z-3 m-3 border border-3 px-2 rounded-3 fw-bold">

            <router-link :to="{ name: 'home' }">Return home Page</router-link>
        </div>

        <div class="form_container d-flex position-relative p-5 h-100 ">

            <form @submit.prevent="submitForm()" action="POST" v-if="!success">
                <div class="d-flex flex-column p-3">
                    <label for="title">Insert title</label>
                    <input type="text" id="title" name="title" v-model="title">
                    <small :key="error" class="text-danger">{{ error }}</small>
                </div>
                <div class="d-flex flex-column p-3">
                    <label for="image">Insert image</label>
                    <input disabled type="file" id="image" name="image">
                    <small :key="error" class="text-danger">{{ error }}</small>
                </div>
                <div class="d-flex flex-column p-3">
                    <label for="content">Insert the content of your new post</label>
                    <textarea name="content" id="content" cols="30" rows="5"
                        placeholder="Inserisci il contenuto del post" class="form-control input_text" v-model="content" required></textarea>
                    <small :key="error" class="text-danger">{{ error }}</small>
                </div>
                <div class="d-flex justify-content-between p-3">
                    <div class="d-flex align-items-center justify-content-center p-2 ">
                        <label for="published">Do you want publish the post?</label>
                        <input type="checkbox" id="published" name="published" class="ms-1 checkbox" v-model="published">
                    </div>
                    <div class="d-flex align-items-center justify-content-center p-2">
                        <label for="categoryId">Select a category</label>
                        <select name="categoryId" id="categoryId" class="form-control" v-model="categoryId">
                            <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="d-flex justify-content-center mt-4">
                    <button type="submit" class="px-4 py-2 border border-0 submit_button rounded-4 fs-6 bg_slide_dark"
                        style="width: 150px;">
                        <span class="strecth_text_hover">Create </span>
                        <span class="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-send" viewBox="0 0 16 16">
                                <path
                                    d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                            </svg>
                        </span>
                    </button>

                </div>

            </form>

        </div>

    </section>
</template>


<style lang="scss" scoped></style>