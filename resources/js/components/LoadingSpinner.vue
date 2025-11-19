<template>
    <div class="flex flex-col items-center justify-center py-12">
        <span :class="`loading loading-${type} ${sizeClass} text-${color}`"></span>
        <p v-if="text" class="mt-4 text-base-content/70">{{ text }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'spinner',
        validator: (value) => ['spinner', 'dots', 'ring', 'ball', 'bars', 'infinity'].includes(value),
    },
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value),
    },
    color: {
        type: String,
        default: 'primary',
    },
    text: {
        type: String,
        default: '',
    },
});

const sizeClass = computed(() => {
    const sizes = {
        xs: 'loading-xs',
        sm: 'loading-sm',
        md: 'loading-md',
        lg: 'loading-lg',
    };
    return sizes[props.size];
});
</script>

