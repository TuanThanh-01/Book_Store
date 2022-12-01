import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const NewBook = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <article className='p-3'>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col' id='columnFirst'>
            <div className='container'>
              <h3 className='mb-5 text-center'>Choose Images</h3>
              <input
                id='uploadFile'
                type='file'
                className='form-control mb-4'
                style={{ width: '500px' }}
                multiple
              />
              <div className='preview'></div>
            </div>
          </div>

          <div className='col' id='columnSecond'>
            <h3 className='text-center mb-3'>Book Infomation</h3>
            <div
              className='container p-3'
              style={{ boxShadow: '0.5px 0.5px 2px 1px' }}
            >
              <form id='bookSaveForm'>
                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label for='title' className='font-weight-bold'>
                      Title
                    </label>
                    <input type='text' className='form-control' id='title' />
                  </div>
                  <div className='form-group col-md-6'>
                    <label for='author' className='font-weight-bold'>
                      Author
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='author'
                      required
                    />
                  </div>
                </div>

                <div className='form-group'>
                  <label for='description' className='font-weight-bold'>
                    Description
                  </label>

                  <textarea
                    id='description'
                    className='form-control'
                    rows='4'
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label for='dateRelease' className='font-weight-bold'>
                      Date Release
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      id='dateRelease'
                    />
                  </div>
                  <div className='form-group col-md-6'>
                    <label for='totalPage' className='font-weight-bold'>
                      Total Page
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='totalPage'
                      min='20'
                    />
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label for='typeBook' className='font-weight-bold'>
                      Type Book
                    </label>
                    <select id='typeBook' className='form-control'>
                      <option selected>Data</option>
                      <option>DevOps</option>
                      <option>Programming Language</option>
                      <option>Machine Learning</option>
                    </select>
                  </div>
                  <div className='form-group col-md-6'>
                    <label for='totalPage' className='font-weight-bold'>
                      Price
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='totalPage'
                      min='10000'
                    />
                  </div>
                </div>

                <div className='text-center text-lg-start mt-4 pt-2'>
                  <button
                    type='submit'
                    className='btn btn-lg'
                    style={{
                      paddingLeft: '2.5rem',
                      paddingRight: '2.5rem',
                      backgroundColor: '#3c4048',
                      color: 'white',
                    }}
                  >
                    Save Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewBook;
