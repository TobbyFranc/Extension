import mainLogo from "../assets/images/logo.svg"
import sunny from "../assets/images/icon-sun.svg"
import moon from "../assets/images/icon-moon.svg"

const Navbar = ({onBgToggle, bgToggled}) => {
  return (
    <div className={`w-[90%] h-[60px]  absolute top-6 left-[50%] -translate-x-[50%]  ${bgToggled ? "bg-[var(--Neutral0)]" : "bg-[var(--Neutral800)]"} rounded-xl p-4 flex justify-between items-center mt-8`}>
        <div className="">
            <img src={mainLogo} alt="" className={bgToggled ? "w-40" : "w-40 filter brightness-0 invert"} />
        </div>
        <button onClick={() => onBgToggle("dark")} className={`cursor-pointer group flex justify-center items-center ${bgToggled ? "bg-[var(--Neutral200)]" : "bg-[var(--Neutral600)]"} bg-opacity-60  p-2 rounded-md`}>
            <img src={ bgToggled ? moon : sunny} alt="" className="w-5 group-hover:scale-120 duration-150" />
        </button>
    </div>
  )
}

export default Navbar