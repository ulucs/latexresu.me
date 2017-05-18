import 'whatwg-fetch'
import React from 'react'
import { object, number, string } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PDF from 'react-pdf'
import { Row, ErrorMessage, LoadingBar } from '../bulma'
import { GeneratorActions } from '../../actions'
import BlankPDF from '../../assets/blank.pdf'
import '../../styles/components/preview.styl'

function Preview({ url, page, status, actions }) {
  console.log(status)

  return (
    <section id='preview'>
      <LoadingBar hidden={status !== 'pending'} />
      {status === 'failure' ? <ErrorMessage text='PDF Generation failure.' /> : null}
      <div className='download-buttons'>
        <a
          href={url}
          download='resume.pdf'
          className='button'
          disabled={status !== 'success'}
        >
          <span className='icon is-small'>
            <i className='fa fa-file-pdf-o' />
            Download PDF
          </span>
        </a>
        <button
          disabled={status !== 'success'}
          className='button'
          onClick={() => actions.downloadSource()}
        >
          <span className='icon is-small'>
            <i className='fa fa-file-code-o' />
            Download Source
          </span>
        </button>
      </div>
      <div className='page-row'>
        <button onClick={actions.prevPage} className='button'>&larr;</button>
        <p>Page {page}</p>
        <button onClick={actions.nextPage} className='button'>&rarr;</button>
      </div>
      <Row>
        <PDF
          file={url || BlankPDF}
          pageIndex={page - 1}
          onDocumentLoad={({ total }) => {
            actions.setPageCount(total)
            actions.setPage(1)
          }}
          onDocumentError={() => console.log('nooooooooooooooooo')}
          error={<ErrorMessage text='PDF Generation failure.' />}
          noData={<ErrorMessage text='Please fill in your info.' />}
        />
      </Row>
    </section>
  )
}

Preview.propTypes = {
  actions: object.isRequired,
  status: string,
  page: number,
  url: string
}

function mapStateToProps(state) {
  return {
    url: state.generator.pdf.url,
    page: state.generator.pdf.page,
    status: state.generator.status
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GeneratorActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview)
