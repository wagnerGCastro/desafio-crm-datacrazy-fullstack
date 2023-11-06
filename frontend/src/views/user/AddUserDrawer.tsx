// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Alert from '@mui/material/Alert'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { addUser, handleSetError, updateUser } from 'src/store/apps/user'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { UsersType } from 'src/types/apps/userTypes'

interface UserData {
  id?: number
  email?: string
  password?: string
  role: string
  firstName: string
  lastName: string
}

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  datagrid: UserData
}



interface StatePassword {
  password: string
  showPassword: boolean
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} Este campo é requerido`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} deve ter pelo menos ${min} caracteres`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schemaAddUser = yup.object().shape({
  firstName: yup
    .string()
    .required('Este campo é requerido')
    .min(3, obj => showErrors('Nome', obj.value.length, obj.min)),
  lastName: yup
    .string()
    .required('Este campo é requerido')
    .min(3, obj => showErrors('Sobre Nome', obj.value.length, obj.min)),
  email: yup
    .string()
    .email('E-mail deve ser válido')
    .required('Este campo é requerido'),
  password: yup
    .string()
    .required('Este campo é requerido')
    .min(3, obj => showErrors('Senha', obj.value.length, obj.min)),
})


const schemaUpdateUser = yup.object().shape({
  firstName: yup
    .string()
    .required('Este campo é requerido')
    .min(3, obj => showErrors('Nome', obj.value.length, obj.min)),
  lastName: yup
    .string()
    .required('Este campo é requerido')
    .min(3, obj => showErrors('Sobre Nome', obj.value.length, obj.min)),
  email: yup
    .string()
    .nullable()
    .email('E-mail deve ser válido'),
  password: yup
    .string()
    .notRequired()
})


const defaultValues = {
  email: '',
  role: '',
  firstName: '',
  lastName: '',
  password: ''
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, datagrid } = props

  // ** State
  const [role, setRole] = useState<string>('client')
  const [values, setValues] = useState<StatePassword>({
    password: '',
    showPassword: false
  })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.user)
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: datagrid ?? defaultValues,
    mode: 'onChange',
    resolver: yupResolver(datagrid ? schemaUpdateUser : schemaAddUser)
  })

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const onSubmit = (data: UserData) => {

    dispatch(handleSetError(false))

    if(datagrid) {

      if (store.allData.some((u: UsersType) => data.email !== datagrid.email && u.email === data.email)) {
        setError('email', {
          message: 'Este e-mail já está cadastrado!'
        })

      } else {
        const  userData = {
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password ? data.password : undefined!,
          email: data.email ? data.email : undefined!,
          id: data.id!,
        }

        dispatch(updateUser({ ...userData, role }))
      }

    } else {

      if (store.allData.some((u: UsersType) => u?.email === data?.email)) {
        setError('email', {
          message: 'Este e-mail já está cadastrado!'
        })

      } else {
        dispatch(addUser({ ...data, role }))
        reset()
      }

    }
  }

  const handleClose = () => {
    setRole('client')
    dispatch(handleSetError(false))
    reset()
    toggle()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>{datagrid ? 'Atualizar Usuário' :'Cadastrar Usuário'}</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{ borderRadius: 1, color: 'text.primary', backgroundColor: 'action.selected' }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>

      <Box sx={{ p: theme => theme.spacing(0, 6, 6) , }}>

        {store?.errors && <Box  sx={{ mb: 5}}>
          <Alert severity='error'>
            <Box sx={{ mb: 1}}>{store.errors?.error}</Box>
            {store.errors?.message.map((item: string) => (<li style={{fontSize: '13px'}} key={item}>{item}</li>)) }
          </Alert>
        </Box>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='firstName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Nome'
                  onChange={onChange}
                  placeholder='Digite seu primeiro nome'
                  error={Boolean(errors.firstName)}
                />
              )}
            />
            {errors.firstName && <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='lastName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Sobre Nome'
                  onChange={onChange}
                  placeholder='Digite seu sobre nome'
                  error={Boolean(errors.lastName)}
                />
              )}
            />
            {errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='email'
              control={control}
              rules={{ required: false }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  autoComplete='false'
                  type='email'
                  value={value}
                  label='Email'
                  onChange={onChange}
                  placeholder='johndoe@email.com'
                  error={Boolean(errors.email)}
                />
              )}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel id='role-select'>Tipo de usuário</InputLabel>
            <Select
              fullWidth
              value={role}
              id='select-role'
              label='Tipo de usuário'
              labelId='role-select'
              onChange={e => setRole(e.target.value)}
              inputProps={{ placeholder: 'Selecione o tipo de usuário' }}
            >
              <MenuItem value='admin'>Admin</MenuItem>
              <MenuItem value='client'>Cliente</MenuItem>
              <MenuItem value='editor'>Editor</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 1.5 }}>
            <InputLabel htmlFor='auth-login-password'>Senha</InputLabel>
            <Controller
              name='password'
              control={control}
              rules={{ required: false}}
              render={({ field: { value, onChange, onBlur } }) => (
                <OutlinedInput
                  autoComplete='false'
                  label='Senha'
                  value={value}
                  onBlur={onBlur}
                  id='auth-login-password'
                  onChange={onChange}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <Icon icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />

            {errors.password && (
              <FormHelperText sx={{ color: 'error.main' }} id=''>
                {errors.password.message}
              </FormHelperText>
            )}
          </FormControl>


          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              {datagrid ? 'Atualizar' :'Cadastrar'}
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
