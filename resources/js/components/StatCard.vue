<template>
    <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
        <div class="card-body">
            <div class="flex justify-between items-start">
                <div>
                    <p class="text-base-content/70 text-sm">{{ title }}</p>
                    <h2 class="text-3xl font-bold mt-2">{{ value }}</h2>
                    <div :class="`badge badge-${badgeColor} badge-sm mt-2 gap-1`">
                        <i :class="`fas fa-arrow-${trend === 'up' ? 'up' : 'down'} text-xs`"></i>
                        {{ change }}
                    </div>
                </div>
                <div class="avatar placeholder">
                    <div :class="`bg-${iconColor} text-${iconColor}-content rounded-full w-12`">
                        <i :class="`fas fa-${icon} text-xl`"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: [String, Number],
        required: true,
    },
    change: {
        type: String,
        required: true,
    },
    trend: {
        type: String,
        default: 'up',
        validator: (value) => ['up', 'down'].includes(value),
    },
    badgeColor: {
        type: String,
        default: 'success',
    },
    icon: {
        type: String,
        required: true,
    },
    iconColor: {
        type: String,
        default: 'primary',
    },
});
</script>

