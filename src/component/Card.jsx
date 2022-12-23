import React from 'react'

export const Card = (props) => {
  return (
    <div class="flex flex-col gap-y-3 mx-auto w-32">
      <img class="h-8 items-center" src={props.icon} alt="icon" />
      <div class="text-s text-center">{props.description}</div>
    </div>
  )
}

