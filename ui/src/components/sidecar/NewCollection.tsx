import React from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '../../elements'
import * as yup from 'yup'

const schema = yup.object().shape({
  space_id: yup.number().required(),
  creator_id: yup.number().required(),
  name: yup
    .string()
    .trim()
    .required('Please provide the channel name!')
		.min(1)
    .max(
      100,
      `Please keep it under 100 characters`
    ),
  schema: yup.array().of(yup.object().shape({
		name: yup.string().required(),
		type: yup.string().required(),
		required: yup.boolean().required(),
    unique: yup.boolean().required()
	}).required())
})

const NewCollection = (props : {}) => {
	const { register, control, handleSubmit, reset, trigger, setError } = useForm({
    // defaultValues: {}; you can populate the fields by this attribute 
  });
	const { fields, append, remove } = useFieldArray({
    control,
    name: "schema"
  });

  const handleFormSumbit = (data) => {
      console.log({data})
    }
	
  return (
			<div className="px-4 py-8">
				<form autoComplete="on" onSubmit={handleSubmit(handleFormSumbit)} className='flex flex-col items-center'>
					<table className='w-full'>
          <thead>
            <tr className='flex'>
            <th className='grow'>Name</th>
            <th className='grow'>Type</th>
            <th className='w-36'>Required?</th>
            <th>Unique?</th>
            <th></th>
          </tr>
          </thead>
            <tbody>
            {fields.map((item, index) => (
                  <tr key={index} className='flex space-x-2 justify-between'>
                  <td>
                  <Controller
                  render={({ field }) => <input className='grow' {...field} />}
                  name={`schema.${index}.name`}
                  control={control}
                  />
                  </td>
                  <td>
                  <Controller
                  render={({ field }) => (
                      <select className='grow w-48' {...field}>
                      <option value='text'>Text</option>
                      <option value='number'>Number</option>
                      <option value='boolean'>Boolean</option>
                      </select>
                      )}
                  name={`schema.${index}.type`}
                  control={control}
                  />
                    </td>
                    <td>
                    <Controller
                    render={({ field }) => <input   type="checkbox" className='w-36' {...field} />}
                  name={`schema.${index}.required`}
                  control={control}
                  />
                    </td>
                    <td>
                    <Controller
                    render={({ field }) => <input   type="checkbox" className='' {...field} />}
                  name={`schema.${index}.unique`}
                  control={control}
                  />
                    </td>
                    </tr>
                    ))}
            </tbody>
					</table>
					<Button
						type="button"
						classname="mx-auto"
						onClick={() => append({ firstName: "bill", lastName: "luo" })}
					>
						Add Field
					</Button>
					<Button
						type="submit"
            primary
						classname="mx-auto"
					>
						Create Collection
					</Button>
        </form>
			</div>
  )
}

export default NewCollection
