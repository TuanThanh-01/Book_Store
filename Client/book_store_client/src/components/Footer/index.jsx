import { Link } from 'react-router-dom';
import {
  AiOutlineMail,
  AiFillPhone,
  AiFillFacebook,
  AiOutlineTwitter,
} from 'react-icons/ai';

const Footer = () => {
  return (
    <footer
      className='page-footer font-small blue pt-4'
      style={{ backgroundColor: '#393E46', color: '#F3EFE0' }}
    >
      <div className='container-fluid text-center text-md-left'>
        <div className='row'>
          <div className='col-md-3 mt-md-0 mt-3'>
            <h5 className='text-uppercase'>general information</h5>
            <p>Bring the best choice to customers</p>
            <p>Bring the best choice to customers</p>
          </div>

          <div className='col-md-3 mb-md-0 mb-3'>
            <h5 className='text-uppercase'>store address</h5>

            <ul className='list-unstyled'>
              <li>
                <p>37-C9 Phuong Mai, Dong Da, Hanoi</p>
                <p> 253 Thuy Khue, Tu Liem, Hanoi</p>
              </li>
            </ul>
          </div>

          <div className='col-md-3 mb-md-0 mb-3'>
            <h5 className='text-uppercase'>Contact</h5>

            <ul className='list-unstyled'>
              <li>
                <AiOutlineMail className='pt-1' />
                <p className='d-inline ml-3'>info@gmail.com</p>
              </li>
              <li>
                <AiFillPhone className='pt-1' />
                <p className='d-inline ml-3'>+01 2345 6789</p>
              </li>
              <li>
                <AiFillFacebook className='pt-1' />
                <Link
                  to='https://www.facebook.com/'
                  className='d-inline ml-3'
                  style={{ color: '#F3EFE0' }}
                >
                  Facebook
                </Link>
              </li>
              <li>
                <AiOutlineTwitter className='pt-1' />
                <Link
                  to='https://twitter.com/'
                  className='d-inline ml-3'
                  style={{ color: '#F3EFE0' }}
                >
                  Twitter
                </Link>
              </li>
            </ul>
          </div>

          <div className='col-md-3 mt-md-0 mt-3'>
            <h5 className='text-uppercase'>Warranty Policy</h5>
            <p>Warranty within 15 days</p>
            <p>The product is not damaged compared to the original</p>
          </div>
        </div>
      </div>

      <div className='footer-copyright text-center py-3'>
        © 2022 Copyright: Tuấn Thành Dev
      </div>
    </footer>
  );
};

export default Footer;
