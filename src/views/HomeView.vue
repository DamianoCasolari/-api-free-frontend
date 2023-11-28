<script>

import axios from "axios";

export default {
    name: "HomeView",

    data() {
        return {
            'base_API': 'http://127.0.0.1:3000/',
            'posts_path': 'posts',
            'error': null,
            'posts': null
        }
    },
    components: {

    },
    methods: {
        getposts(url) {
            axios.get(url).then(response => {
                console.log(response);
                this.posts = response.data.data;

            }).catch(error => {
                console.log(error);
                this.error = error.message
            })
        },
        dragAndScroll() {
            const container = document.querySelector('.scrollable-container');
            let isDragging = false;
            let startX;

            container.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX - container.offsetLeft;
                container.classList.add('grabbing');
                console.log("ciao");
            });

            window.addEventListener('mousemove', (e) => {
                if (!isDragging) return;

                e.preventDefault();

                const x = e.clientX - container.offsetLeft;
                const deltaX = x - startX;
                container.scrollLeft -= deltaX;

                startX = x;
            });

            window.addEventListener('mouseup', () => {
                isDragging = false;
                container.classList.remove('grabbing');
            });
        }
    },
    mounted() {
        const url = this.base_API + this.posts_path;
        this.getposts(url);
        this.dragAndScroll()

    }

}
</script>
<template>
    <section class="index_section position-relative">

        <div class="add_post position-fixed end-0 z-3 m-3 border border-3 px-2 rounded-3 fw-bold">
            <router-link :to="{ name: 'create' }">Add post</router-link>
        </div>

        <div id="album_rotator_holder" class="d-flex position-relative scrollable-container p-5 h-100">

            
            <article class=" single_post col-9 col-md-5 col-xxl-3 rounded-4" v-for=" post, index in  posts " v-show="post.published" >
                <div
                    class="album_details fs_card d-flex flex-column h-100 p-3 position-relative z-2 ">
                        <div class="fs-3 fw-bold"> {{ post.title }}
                        </div>
                        <div class="content fw-semibold">
                            <span>{{ post.content }}</span>
                        </div>
                </div>
            </article>
        </div>

    </section>
</template>


<style lang="scss" scoped></style>