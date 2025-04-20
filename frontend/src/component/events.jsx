import React from "react";
import Departments from "./department";

function Eventsbox({title,description,link}){
    return (
<div className="w-full md:w-1/2 px-4 mb-6 ">
<h3 className="font-semibold text-lg pl-2 mb-2">{title}</h3>
<div className="p-4 bg-gray-100 rounded shadow h-80 flex felx-col justify-between">
    <div>
        <p>{description}</p>
    </div>
    <a href={link}
    className="text-right text-white bg-blue-600 px-2 py-2 rounded self-end hover:bg-blue-700">
Visit
    </a>
</div>
</div>
    );
}

function Events(){
    const event=[
        {
            title:"Recent Event",
            description:"here you find about recent college events",
            link:"/events/recent",
        }
    ];
    return(
        <div className="flex flex-wrap mx-4">
          {event.map((eve,index)=>(
            <Eventsbox
            key={index}
            title={eve.title}
            description={eve.description}
            link={eve.link}
            />
          )
        )}  
        </div>
    )
}

export default Events;