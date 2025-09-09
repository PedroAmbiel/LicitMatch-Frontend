<template>

    <div>
        <Panel class="!text-blue-500" header="LicitMatch">
        <p class="m-0">
            <NuxtImg src="/images/ConnectGov_1.png" alt="Image" width="250" />
        Temos o compromisso de proporcionar a melhor experiência de contratação entre Órgãos Públicos e Empresas Privadas.
    </p>
</Panel>
        {{ value }}
        <FloatLabel>
    <InputText id="username" v-model="value" />
    <label for="username">Username</label><Button label="Enviar" class="bg-black text-white" />
    
</FloatLabel>

<FloatLabel>
    <Password v-model="value" :feedback="false" />
    <label for="Password">Password</label>
</FloatLabel>
    </div>
</template>

<script setup lang="ts">
    import { FloatLabel, InputText } from 'primevue';
    import Password from 'primevue/password';
    import Panel from 'primevue/panel';
    import Image from 'primevue/image';
    import { NuxtImg } from '#components';
    const value = ref("")
</script>