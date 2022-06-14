import "styles/rules.scss";
import Image from 'components/Image';
import Logo from 'assets/images/logo/pure_logo.png';

const Privacy = () => {
    return (
        <div className="__terms">

            <div className="_header">
                <a href="/" className="logo-link">
                    <Image src={Logo} alt={'Maishah'} />
                </a>
            </div>

            <div className="_body">
                <div className="header">
                    <p className="title">Privacy Policy</p>
                    <p className="subtitle">Last update at November 2021</p>
                </div>
            </div>

            <div className="_information">
                <div className="cover">
                    <h2 className="header">1. Main Objective</h2>
                    <p className="describe">We know it's tempting to skip these Terms of Service, but it's important to establish what you can expect from us as you use services, and what we expect from you. We know it's tempting to skip these Terms of Service, but it's important to establish what you can expect from us as you use services, and what we expect from you. We know it's tempting to skip these Terms of Service, but it's important to establish what you can expect from us as you use services, and what we expect from you</p>
                    <p className="describe">Title for ul</p>
                    <ul className="list">
                        <li className="listing">
                            <p className="exp">We know it's tempting to skip these Terms of Service</p>
                        </li>
                        <li className="listing">
                            <p className="exp">We know it's tempting to skip these Terms of Service</p>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Privacy;