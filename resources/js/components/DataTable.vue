<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <div class="flex justify-between items-center mb-4">
                <h2 class="card-title">
                    <i :class="`fas fa-${icon} mr-2`"></i>
                    {{ title }}
                </h2>
                <slot name="header-actions">
                    <button class="btn btn-sm btn-ghost gap-2">
                        View All
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </slot>
            </div>
            
            <div class="overflow-x-auto">
                <table class="table table-zebra">
                    <thead>
                        <tr>
                            <th v-if="selectable">
                                <label>
                                    <input type="checkbox" class="checkbox checkbox-sm" @change="toggleAll" />
                                </label>
                            </th>
                            <th v-for="column in columns" :key="column.key">
                                {{ column.label }}
                            </th>
                            <th v-if="actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <slot></slot>
                    </tbody>
                </table>
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
    icon: {
        type: String,
        default: 'list',
    },
    columns: {
        type: Array,
        required: true,
    },
    selectable: {
        type: Boolean,
        default: false,
    },
    actions: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(['toggle-all']);

const toggleAll = (event) => {
    emit('toggle-all', event.target.checked);
};
</script>

