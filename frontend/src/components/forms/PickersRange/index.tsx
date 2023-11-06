// ** React Imports
import {  forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

interface PickerProps {
  label?: string
  end: Date | number
  start: Date | number
}

type PickersRangeProps = {
  popperPlacement: ReactDatePickerProps['popperPlacement']
  handleOnChangeRange: (dates: any) => void
  endDateRange: DateType
  startDateRange: DateType
}

const PickersRange = ({ popperPlacement, handleOnChangeRange, endDateRange, startDateRange }: PickersRangeProps) => {

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = format(props.start, 'dd/MM/yyyy')
    const endDate = props.end !== null ? ` - ${format(props.end, 'dd/MM/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <TextField fullWidth inputRef={ref} label={props.label || ''} {...props} value={value}  />
  })

  return (
    <Box sx={{ display: 'flex', width: '100%', marginTop: '-16px'}} className='demo-space-x'>
      <div style={{display: 'flex', width: '100%'}}>
        <DatePicker
          locale={ptBR}
          selectsRange
          monthsShown={2}
          minDate={new Date(2023, 10, 1)}
          endDate={endDateRange}
          selected={startDateRange}
          startDate={startDateRange}
          shouldCloseOnSelect={false}
          id='date-range-picker-months'
          onChange={handleOnChangeRange}
          popperPlacement={popperPlacement}
          customInput={
            <CustomInput
              label='Selecione entre datas do cadastro'
              end={endDateRange as Date | number}
              start={startDateRange as Date | number}
            />
          }
        />
      </div>
    </Box>
  )
}

export default PickersRange
