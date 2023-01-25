<script setup lang="ts">
import { z } from 'zod';
import { toFormValidator } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import type { LoginForm } from '@/shared/interfaces';
import { useRouter } from 'vue-router';
import { useUser } from '@/shared/stores';
const router = useRouter();
const userStore = useUser();
const validationSchema = toFormValidator(z.object({
    email: z.string({ required_error: 'Vous devez renseigner ce champ' }).email('Format email incorrect'),
    password: z.string({ required_error: 'Vous devez renseigner ce champ' }).min(5, 'Le mot de passe doit faire au moins 5 caractères'),
}));
const { handleSubmit, setErrors } = useForm<{ email: string, password: string }>({
    validationSchema,
});
const submit = handleSubmit(async (formValue: LoginForm) => {
    try {
        await userStore.login(formValue);
        router.push('/profil');
    } catch (e) {
        setErrors({ password: e as string })
    }
})
const { value: emailValue, errorMessage: emailError } = useField('email');
const { value: passwordValue, errorMessage: passwordError } = useField('password');
</script> 

<template>
    <div class="container flex flex-row p-16 justify-center items-start">
        <form @submit="submit" class="card flex flex-col gap-8">
            <div>
                <div class='logo'>
                    <img class="max-h-12" src="../assets/images/logo-munch.png" alt="logo-munch">
                </div>
                <h2 >Se connecter</h2>
            </div>
            <div class='text-sm font-semibold'>
                S'inscrire avec des comptes 
            </div>
            <hr class='m-auto w-3/4'>
            <div>
                <div class='mb-4'>
                    <span class='text-sm font-semibold'>
                        Ou continuer avec votre adresse mail
                    </span>
                </div>
                <div class="flex flex-col gap-4">
                    <div class='flex flex-col gap-2'>
                        <input placeholder="Email" v-model="emailValue" id="email" type="text">
                        <p v-if="emailError" class="form-error">{{ emailError }} </p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <input placeholder="Mot de passe" v-model="passwordValue" id="password" type="password">
                        <p v-if="passwordError" class="form-error">{{ passwordError }}</p>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary rounded-lg">Connexion</button>
        </form>
    </div>
</template>


<style scoped lang="scss" >
.card{
    width: 100%;
    width: 500px;
    padding-inline: 64px;
    padding-block: 128px;
}

h2{
    font-size: 32px;
    font-weight: 600;
}

input{
    color: #9A9FA5;
    border-radius: 46px;
    background-color: #F4F4F4;
    font-size: 14px;
    width: 100%;
}
</style>