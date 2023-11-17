import { useState, useEffect } from 'react'
import { Card } from "antd"
import { getDate } from "./components/dateFunction.ts"
import MapCard from "./components/MapCard.tsx" 
import './App.css'
import { imageOverlay } from 'leaflet'

const { Meta } = Card;

type Flag = {
  name: {
    common: string,
    official: string,
  },
  flags: {
    svg: string
  },
  capital: Array<string>,
  altSpellings: Array<string>,
}

type IP = {
  ip: string,
  location: {
    city: string,
    country: string,
    lat: number,
    lng: number
  }
}

const App: React.FC = () => {
const [ip, setIp] = useState<IP[]>([]);
const [country, setCountry] = useState<Flag[]>([]);
const [latitude, setLatitude] = useState<number>(0);
const [longitude, setLongitude] = useState<number>(0);
const [showMap, setShowMap] = useState<boolean>(false);

const fetchAddCountry = async (): Promise<Flag | undefined> => {
  try {
  const res = await fetch(`${import.meta.env.VITE_GOOGLE_MAPS_API_KEY_2}`);
  const data = await res.json();                                                              
  setCountry(data);
  return data;
} catch (err) {
  console.log(err);
}
}

const fetchIP  = async (): Promise<IP | undefined> => {
  try {
    const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`);
    const data = await res.json();
    setIp(data);
    setLatitude(data?.location?.lat);
    setLongitude(data?.location?.lng);
    setShowMap(true)
    return data;
  } catch (err) {
    console.log(err);
  }
}

useEffect(() => {
  fetchIP();
  fetchAddCountry();
}, [])

const filteredArray: Flag[] = country.filter((item) => item.altSpellings.includes(ip.location?.country))

const date: string = getDate();
console.log(ip);
  return (
    <>
    <div className="xl:flex flex-row h-screen justify-center items-center bg-waterfall bg-cover bg-no-repeat justify-start">
    <div className="flex flex-col">
    <Card
    hoverable
    className="w-[300px] bg-grey-trans text-white m-[10px]"
    >
    <h1>Your IP Address is: <br/> {ip.ip} </h1>
    </Card>

    {filteredArray.map((item, index) =>
    <Card
    key={index}
    hoverable
    className="w-[350px] bg-grey-trans text-white m-[10px]"
    cover={<img src={item.flags.svg} alt={item.name.common}/>}
    >
    <Meta 
    className="text-white"
    title={item.name.common} 
    description={
      <>
      Capital: {item.capital} <br/> Current Date and Time: {date}
    </>  
    }
      />
    </Card>
    )}
    </div>
{/* // Map */}
{showMap &&
(<MapCard latitude = {latitude} longitude = {longitude}/>)}
    </div>
    </>
  )
}

export default App
