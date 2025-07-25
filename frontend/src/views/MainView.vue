<script setup>
import EmployeeForm from '@/components/EmployeeForm.vue';
import ListComp from '@/components/ListComp.vue'
import ManagerForm from '@/components/ManagerForm.vue'
import Topbar from '@/components/Topbar.vue';
import { useAuthStore } from '@/stores/auth';
import { useEmployeeStore } from '@/stores/Employee';
import { useManagerStore } from '@/stores/Manager'
import { onMounted, watchEffect, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useNotification } from '@kyvg/vue3-notification';
import ProjectForm from '@/components/ProjectForm.vue';
import { useProjectStore } from '@/stores/Project';

const { notify } = useNotification()
const show = ref('mgr')
const cols = ref([])
const data = ref([])
const isEditing = ref(false)
const editItm = ref({})
const mgrStore = useManagerStore()
const empStore = useEmployeeStore()
const proStore = useProjectStore()
const auth = useAuthStore()
const router = useRouter()

auth.me()

const fetchData = async () => {
    try {
        if (show.value === 'mgr') {
            const res = await mgrStore.getAllManagers()
            if (res.success) {
                cols.value = mgrStore.mgrCols
                data.value = mgrStore.managers
            } else {
                notify({
                    text: `${res.message}`,
                    type: 'error'
                })
            }
        } else if (show.value === 'emp') {
            const res = await empStore.getAllEmployees()
            if (res.success) {
                cols.value = empStore.empCols
                data.value = empStore.employees
            } else {
                notify({
                    text: `${res.message}`,
                    type: 'error'
                })

            }
        }
        else if(show.value === 'pro'){
            const res = await proStore.getAllProjects()
            if (res.success) {
                cols.value = proStore.proCols
                data.value = proStore.projects
            } else {
                notify({
                    text: `${res.message}`,
                    type: 'error'
                })

            }
        }
    } catch (error) {
        notify({
            text: `${error.message}`,
            type: 'error'
        })
    }
}

watchEffect(async () => {
    fetchData()
})


onMounted(async () => {
    const res = await mgrStore.getAllManagers()
    if (res.success) {
        cols.value = mgrStore.mgrCols
        data.value = mgrStore.managers
    }
    else {
        notify({
            text: `${res.message}`,
            type: 'error'
        })
    }
})

const toggleForm = (value) => {
    show.value = value
    fetchData()
}

const handleEdit = (obj) => {
    isEditing.value = true;
    editItm.value = obj
}

const handleMgrDel = async (obj) => {
    const res = await mgrStore.deleteMgr(obj.mgrId);
    if (res.success) {
        notify({
            text: 'Manager deleted successfully!',
            type: 'success'
        })
        fetchData()
    }
    else {
        notify({
            text: `${res.message}`,
            type: 'error'
        })
    }

}

const handleEmpDel = async (obj) => {
    const res = await empStore.deleteEmp(obj.empId);
    if (res.success) {
        notify({
            text: 'Employee deleted successfully!',
            type: 'success'
        })
        fetchData()
    }
    else {
        notify({
            text: `${res.message}`,
            type: 'error'
        })
    }
}

const handleProDel = async (obj) => {
    const res = await proStore.deletePro(obj.proId);
    if (res.success) {
        notify({
            text: 'Project deleted successfully!',
            type: 'success'
        })
        fetchData()
    }
    else {
        notify({
            text: `${res.message}`,
            type: 'error'
        })
    }
}

const handleUpdate = () => {
    isEditing.value = false
    editItm.value = {}
    fetchData();
}

</script>

<template>
    <div v-if="auth.user">
    <router-link to="/order"><button> Order Food </button></router-link>
    </div>
</template>

