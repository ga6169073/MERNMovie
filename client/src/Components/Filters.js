import React, { Fragment } from 'react'
import { Listbox, ListboxButton, ListboxOptions, Transition, ListboxOption } from '@headlessui/react'
import { FaAngleDown, FaCheck } from "react-icons/fa"
import { LanguageData, RateData, TimeData, YearData } from '../Data/FiltersData'

function Filters( props ) {
  const {
    categories,
    category,
    setCategory,
    year,
    setYear,
    time,
    setTime,
    rate,
    setRate,
    language,
    setLanguage
  }
  =props?.data
  const Filter = [
    {
      value: category,
      onChange: setCategory,
      items: categories?.length > 0 ? [
        { title: "All Categories" },
        ...categories
      ] : [
        { title: "All Categories" },
        { title: "No category found" }
      ]
    },
    {
      value: year,
      onChange: setYear,
      items: YearData,
    },
    {
      value: time,
      onChange: setTime,
      items: TimeData,
    },
    {
      value: rate,
      onChange: setRate,
      items: RateData,
    },
    {
      value: language,
      onChange: setLanguage,
      items: LanguageData,
    }
  ]

  // useEffect(() => {
  //   if (category?.title !== "No category found") {
  //     dispatch(getAllMoviesAction({
  //       category: category?.title === "All Categories" ? "" : category?.title,
  //       year: year?.title === "Sort By Year" ? "" : year?.title.replace(/\D/g, ""),
  //       time: time?.title === "Sort By Time" ? "" : time?.title.replace(/\D/g, ""),
  //       rate: rate?.title === "Sort By Rate" ? "" : rate?.title.replace(/\D/g, ""),
  //       language: language?.title === "Sort By Language" ? "" : language?.title,
  //       search: "",
  //     }))
  //   }
  // }, [category, language, year, time, rate, dispatch])
  return (
    <div className='grid grid-cols-2 md:grid-cols-5 my-6 bg-dry text-dryGray border-gray-800 gap-2 lg:gap-12 rounded p-6'>
      {
        Filter.map((item, index) => (
          <Listbox key={index} value={item.value} onChange={item.onChange} by="title" >
            <div className='relative'>
              <ListboxButton className='relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-sx'>
                <span className='block truncate'>{item.value.title}</span>
                <span className='absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2'>
                  <FaAngleDown className="h-4 w-4 mr-2" aria-hidden="true" />
                </span>
              </ListboxButton>
              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom='opacity-100' leaveTo='opacity-0'>
                <ListboxOptions className="absolute z-10 mt-1 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {
                    item.items.map((i, index) => (
                      <ListboxOption key={index} className={({ focus }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${focus ? "bg-subMain text-white" : "text-main"
                        }`} value={i}>
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'
                              }`}>
                              {i.title}
                            </span>
                            {
                              selected ? (
                                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                                  <FaCheck className='h-5 w-5' aria-hidden="true" />
                                </span>
                              ) : null
                            }
                          </>
                        )}
                      </ListboxOption>
                    ))
                  }
                </ListboxOptions>
              </Transition>
            </div>
          </Listbox>
        ))
      }
    </div>
  )
}

export default Filters