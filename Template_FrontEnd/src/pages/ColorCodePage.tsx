import "./styles/ColorCodePage.scss"
import NavigationBar from "../components/NavigationBar"
import Color from "../components/Color"
import Footer from "../components/Footer"

function ColorCodePage() {
  return (
    <div className="ColorCodePage" >
        <NavigationBar/>
        <Color/>
        <Footer/>
    </div>
  )
}

export default ColorCodePage

 