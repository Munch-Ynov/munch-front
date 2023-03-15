<template>
    <div class='container flex flex-row p-16 justify-center items-start'>
        <form @submit="submit" class="card flex flex-col gap-8">
            <div>
                <div class='logo'>
                    <img class="max-h-12" src="../assets/images/logo-munch.png" alt="logo-munch">
                </div>
                <h2 >S'inscrire</h2>
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
                <div class='flex flex-col gap-4'>
                    <div class="flex flex-row gap-4">
                        <div class="flex flex-col gap-2">
                            <input v-model="firstNameValue" placeholder="Prénom" id="name" type="text">
                            <p v-if="firstNameError" class="form-error">{{ firstNameError }}</p>
                        </div>
                        <div class="flex flex-col gap-2">
                            <input v-model="lastNameValue" placeholder="Nom" id="name" type="text">
                            <p v-if="lastNameError" class="form-error">{{ lastNameError }}</p>
                        </div>
                    </div>
                    <div class='flex flex-col gap-2'>
                        <input v-model="emailValue" placeholder="Email" id="email" type="text">
                        <p v-if="emailError" class="form-error">{{ emailError }}</p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <input placeholder="Mot de passe" v-model="passwordValue" id="password" type="password">
                        <p v-if="passwordError" class="form-error">{{ passwordError }}</p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <input type="Mot de passe" v-model="passwordConfirm"
                        id="password-confirm" placeholder="Confirmer le mot de passe">
                        <p v-if="passwordConfirmation" class="form-error">{{ passwordConfirmation }}</p>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary rounded-lg">S'inscrire</button>
        </form>
    </div>
</template>
    
    
<script setup lang="ts">
    import { z } from 'zod'
    import { toFormValidator} from '@vee-validate/zod'
    import { useField, useForm} from 'vee-validate'
    import type { UserForm } from '@/shared/interfaces';
    import { createUser } from '@/shared/services/user.service';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const validationSchema = toFormValidator(z.object({
        firstName: z.string({required_error: "Vous devez renseigner ce chmap"}).min(2, "Trop court"),
        lastName: z.string({required_error: "Vous devez renseigner ce chmap"}).min(2, "Trop court"),
        email: z.string({required_error: "Vous devez renseigner ce chmap"}).email('Format email incorect'),
        password: z.string({required_error: "Vous devez renseigner ce champ"}).min(5,'Le mdp doit faire au moins 5 caractères'),
        passwordConfirmation: z.string({required_error: "Vous devez renseigner ce champ"}).min(5)

    }).refine((data) => data.password === data.passwordConfirmation,{
        message: 'Les mots de passes ne correspondent pas',
        path: ['passwordConfirmation'],
        })
    );

    const { handleSubmit, setErrors} = useForm({validationSchema});

    const submit = handleSubmit( async (formValue: UserForm) => {
        // console.log(formValue);
        try {
            await createUser(formValue);
            router.push('/connexion')
        }catch (e) {
            console.log(e);
            
        }
    })

    const {value: firstNameValue, errorMessage: firstNameError} = useField('firstName')
    const {value: lastNameValue, errorMessage: lastNameError} = useField('lastName')
    const {value: emailValue, errorMessage: emailError} = useField('email')
    const {value: passwordValue, errorMessage: passwordError} = useField('password')
    const {value: passwordConfirm, errorMessage: passwordConfirmation} = useField('passwordConfirmation');

</script>

      
    
<style scoped lang="scss">
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
