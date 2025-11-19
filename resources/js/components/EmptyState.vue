<template>
    <div class="flex flex-col items-center justify-center py-12 px-4">
        <div class="avatar placeholder mb-4">
            <div :class="`bg-${iconColor} text-${iconColor}-content rounded-full w-20 opacity-20`">
                <i :class="`fas fa-${icon} text-4xl`"></i>
            </div>
        </div>
        <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
        <p class="text-base-content/70 text-center max-w-md mb-6">{{ message }}</p>
        <slot name="action">
            <button v-if="actionText" class="btn btn-primary gap-2">
                <i v-if="actionIcon" :class="`fas fa-${actionIcon}`"></i>
                {{ actionText }}
            </button>
        </slot>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: 'No data available',
    },
    message: {
        type: String,
        default: 'There is no data to display at the moment.',
    },
    icon: {
        type: String,
        default: 'inbox',
    },
    iconColor: {
        type: String,
        default: 'primary',
    },
    actionText: {
        type: String,
        default: '',
    },
    actionIcon: {
        type: String,
        default: '',
    },
});
</script>

