<template>
    <div class="flex justify-between items-center">
        <div>
            <h1 class="text-3xl font-bold">
                <i v-if="icon" :class="`fas fa-${icon} mr-2 text-primary`"></i>
                {{ title }}
            </h1>
            <p v-if="subtitle" class="text-base-content/70 mt-1">{{ subtitle }}</p>
        </div>
        <div v-if="$slots.actions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        default: '',
    },
    icon: {
        type: String,
        default: '',
    },
});
</script>

