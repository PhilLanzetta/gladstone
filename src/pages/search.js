import React, { useMemo } from "react"
import { injectIntl, FormattedMessage } from "gatsby-plugin-intl"
import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  useInstantSearch,
  Configure,
  RefinementList,
} from "react-instantsearch-hooks-web"
import Hit from "../components/searchResult"
import Seo from "../components/seo"
import { BsArrowRight, BsArrowLeft } from "react-icons/bs"
import * as styles from "../components/search.module.css"

function NoResultsBoundary({ children, fallback }) {
  const { results } = useInstantSearch()

  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned yet.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    )
  }

  return children
}

function NoResults() {
  const { indexUiState } = useInstantSearch()

  return (
    <div>
      <p>
        No results for <q>{indexUiState.query}</q>.
      </p>
    </div>
  )
}

function EmptyQueryBoundary({ children, fallback }) {
  const { indexUiState } = useInstantSearch()

  if (!indexUiState.query) {
    return fallback
  }

  return children
}

const Search = ({ intl, pageContext }) => {
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )

  let pageIndex = "Page"

  if (pageContext.language === "ko") {
    pageIndex = "Korean Page"
  } else if (pageContext.language === "zh") {
    pageIndex = "Chinese Page"
  } else {
    pageIndex = "Page"
  }

  return (
    <div className="pageContainer">
      <div className={styles.searchPage}>
        <div className="pageHeading">
          <FormattedMessage id="search"></FormattedMessage>
        </div>
        <InstantSearch
          searchClient={searchClient}
          indexName={pageIndex}
          routing={true}
        >
          <SearchBox
            placeholder={intl.formatMessage({ id: "type_here" })}
            id="search-box"
            searchAsYouType={true}
            classNames={{
              root: styles.searchBox,
              form: styles.searchBoxForm,
              input: styles.searchBoxInput,
              reset: styles.searchBoxReset,
              submit: styles.searchBoxSubmit,
              submitIcon: styles.searchBoxIcon,
              resetIcon: styles.searchBoxIcon,
            }}
            submitIconComponent={({ classNames }) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 15.28 17.233"
                className={classNames.submitIcon}
              >
                <g
                  id="Group_139"
                  data-name="Group 139"
                  transform="translate(-31.534 -30.777)"
                >
                  <line
                    id="Line_150"
                    data-name="Line 150"
                    y1="5.862"
                    x2="5.073"
                    transform="translate(32.102 41.657)"
                    fill="none"
                    stroke="#000"
                    stroke-width="1.5"
                  />
                  <g
                    id="Ellipse_8"
                    data-name="Ellipse 8"
                    transform="translate(34.639 30.777)"
                    fill="none"
                    stroke="#000"
                    stroke-width="1.5"
                  >
                    <circle cx="6.088" cy="6.088" r="6.088" stroke="none" />
                    <circle cx="6.088" cy="6.088" r="5.338" fill="none" />
                  </g>
                </g>
              </svg>
            )}
            resetIconComponent={({ classNames }) => (
              <div className={classNames.resetIcon}></div>
            )}
          />
          <EmptyQueryBoundary fallback={null}>
            <NoResultsBoundary fallback={<NoResults />}>
              <div className={styles.searchOptionsBar}>
                <p className={styles.filterLabel}>Filter:</p>
                <RefinementList
                  attribute="searchCategoryDisplay"
                  classNames={{
                    root: styles.refinementContainer,
                    checkbox: styles.refinementCheck,
                    list: styles.refinementList,
                    item: styles.refinementItem,
                    labelText: styles.refinementText,
                    selectedItem: styles.refinementSelected,
                    count: styles.refinementCount,
                  }}
                />
              </div>
              <Hits
                hitComponent={Hit}
                classNames={{ root: styles.hitsContainer }}
              />
              <Configure hitsPerPage={10}></Configure>
              <Pagination
                padding={2}
                showFirst={false}
                showPrevious={true}
                showNext={true}
                showLast={false}
                translations={{
                  previousPageItemText: (
                    <button
                      className={styles.searchPrev}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <BsArrowLeft></BsArrowLeft>{" "}
                      <FormattedMessage id="previous_page"></FormattedMessage>
                    </button>
                  ),
                  nextPageItemText: (
                    <button
                      onClick={() => window.scrollTo(0, 0)}
                      className={styles.searchNext}
                    >
                      <FormattedMessage id="next_page"></FormattedMessage>{" "}
                      <BsArrowRight></BsArrowRight>
                    </button>
                  ),
                  previousPageItemAriaLabel: "Go to previous page",
                  nextPageItemAriaLabel: "Go to next page",
                }}
                classNames={{
                  root: styles.paginationRoot,
                  list: styles.paginationList,
                  pageItem: styles.paginationPage,
                  disabledItem: styles.paginationDisabled,
                  selectedItem: styles.paginationSelected,
                }}
              ></Pagination>
            </NoResultsBoundary>
          </EmptyQueryBoundary>
        </InstantSearch>
      </div>
    </div>
  )
}

export const Head = () => <Seo title="Search" />

export default injectIntl(Search)
