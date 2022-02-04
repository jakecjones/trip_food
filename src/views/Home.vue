<template>
    <div class="wrapper">
        <div
            class="ux-card"
            v-for="(item, index) in items" 
            :key="index"
        >
            <div class="ux-card__items">
                <div class="ux-card__image" :style="{backgroundImage: `url(${item.image_url})`}">
                </div>
                <div class="ux-card__info">
                    {{item.name}}<br>
                    <span class="ux-card__tag" v-if="item.is_closed">
                        CLOSED
                    </span>
                    <div class="ux-card__location">
                        <a :href="`https://maps.google.com/maps?q=${getAddress(item.location.display_address)}`" target="_blank" rel="noopener noreferrer">
                            <div class="ux-card__text" v-for="(address) in item.location.display_address" :key="address">
                                {{address}}
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/services/api';

export default {
    data() {
        return {
            items: []
        }
    },
    methods: {
        getAddress(address) {
            let text = "";
            address.forEach(element => {
                text += element;
            });

            return text;
        }
    },
    async created() {
        const params = {
            latitude: this.$route.query.latitude,
            longitude: this.$route.query.longitude,
            categories: this.$route.query.categories
        }
        const response = await api.get(params);
        if (response && response.businesses) {
            console.log(response)
            this.items = response.businesses
        }
    }
}
</script>

<style lang="scss" scoped>

.wrapper {
    width: 95%;
    margin: 20px auto;
    padding-bottom: 20px;
}
.ux-card {
    box-shadow: 0 0 10px #eee;
    border: 1px solid #eee;
    margin: 0 0 10px 0;
    border-radius: 5px;
    min-height: 100px;
    height: auto;
    font-family: 'Avenir', sans-serif;
    letter-spacing: .01em;
    overflow: hidden;
    position: relative;
 
    &__image {
        width: 150px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-size: cover;
        background-position: center;
    }
    &__info {
        width: calc(100% - 150px);
        height: 100%;;
        margin-left: 150px;
        padding: 20px 15px;
    }
    &__tag {
         background-color: rgb(226, 189, 186);
         border: 1px solid rgb(144, 84, 84);
         color: rgb(144, 84, 84);
         border-radius: 5px;
         font-size: 10px;
         padding: 3px 6px;
         font-weight: bolder;
    }
    &__location {
        margin-top: 10px;
    }
    &__text {
        padding: 1px 0;
        font-size: 12px;
    }
    a {
        color: #000;
    }
}
</style>