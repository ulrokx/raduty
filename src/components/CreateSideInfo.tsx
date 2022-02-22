import React from 'react'

interface CreateSideInfoProps {

}

export const CreateSideInfo: React.FC<CreateSideInfoProps> = ({}) => {
        return (
        <div>
            <h2 className='text-3xl font-medium'>Instructions</h2>
            <p>Fill out the fields to let us know who you are. Then, select the days of the year which you will be generally available to be on duty from 9pm to 5am (day meaning the initial day starting at 9pm). </p>
            <p className='mt-2'>You are required to be on duty at least <b>5 weekdays</b>, and <b>3 weekend days</b> each semester (weekend days starting on Friday and Saturday, Sunday being included in the weekdays).</p>
            <p className='mt-2'>After selecting the days that you will be generally available, add all of the dates falling on those days that you will not be able to be on duty.</p>
            <p className='mt-2'>For the days of the week, you must select at least one of Friday or Saturday, and have at least 3 available days not requested off on those days.</p>
        </div>
        );
}