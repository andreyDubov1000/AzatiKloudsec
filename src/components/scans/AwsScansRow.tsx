import CustomBox from '@component/atoms/CustomBox'
import CustomImage from '@component/atoms/CustomImage'
import CustomTableRow from '@component/atoms/CustomTableRow'
import { Span } from '@component/atoms/Typography'
import { Autocomplete, Checkbox, TextField } from '@material-ui/core'
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons'
import { LoadingButton } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { scanAwsAccount } from 'services/scanService'

export interface AwsScansRowProps {
  userId: string
  AccountId: string
  AccountAlias: string
  scanOptions: {
    label: string
    value: string
    imgUrl?: string
  }[]
}

const AwsScansRow: React.FC<AwsScansRowProps> = ({ userId, AccountId, scanOptions, AccountAlias }) => {
  const [loading, setLoading] = useState(false)
  const [requestId, setRequestId] = useState('')
  const [checkedList, setCheckedList] = useState<string[]>([])

  const handleChange = async (e: any, list: any[]) => {
    setCheckedList(list.map((item) => item.value))
  }

  const handleScan = async () => {
    if (!!checkedList.length && userId && AccountId) {
      setLoading(true)
      const checkRequest = await scanAwsAccount(userId, 'aws', AccountId, checkedList)
      if (checkRequest) setRequestId(checkRequest.RequestId)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (requestId && AccountId) {
      window.open(`${window.location.origin}/scans/aws/${AccountId}/${requestId}`)
    }
  }, [AccountId, requestId])

  return (
    <CustomTableRow sx={{ p: '0.75rem 1rem', mb: '0.5rem' }}>
      <Span color='text.hint' mr='1rem'>
        {AccountId}
      </Span>

      <Span color='text.hint' mr='1rem'>
        {AccountAlias}
      </Span>

      <Autocomplete
        multiple
        size='small'
        limitTags={3}
        disableCloseOnSelect
        options={scanOptions}
        getOptionLabel={(option) => option.label}
        ChipProps={{
          sx: { textTransform: 'capitalize' },
        }}
        sx={{ maxWidth: 200 }}
        renderInput={(params) => <TextField {...params} margin='none' label='Service Type' variant='outlined' />}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlank fontSize='small' />}
              checkedIcon={<CheckBox fontSize='small' />}
              checked={selected}
              sx={{ mr: '0rem' }}
            />
            {option.value !== 'all' && (
              <CustomImage
                src={`/assets/images/icons/${option.value}_32.svg`}
                sx={{ mr: '0.5rem', width: 20, borderRadius: 1 }}
                alt={option.value}
              />
            )}
            {option.label}
          </li>
        )}
        onChange={handleChange}
      />

      <CustomBox sx={{ textAlign: 'center' }}>
        <LoadingButton
          variant='contained'
          color='primary'
          size='small'
          disableElevation
          sx={{ borderRadius: '300px', px: '1rem' }}
          loading={loading}
          onClick={handleScan}
        >
          Scan
        </LoadingButton>
      </CustomBox>
    </CustomTableRow>
  )
}

export default AwsScansRow
