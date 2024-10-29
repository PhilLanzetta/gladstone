import React, { useMemo } from "react"
import Layout from "../components/layout"
import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  useInstantSearch,
  Configure,
  useStats,
  RefinementList,
  useSortBy,
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

const Search = () => {
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )

  return (
    <Layout>
      <div className={styles.searchPage}>
        <InstantSearch
          searchClient={searchClient}
          indexName="Pages"
          routing={true}
        >
          <SearchBox
            placeholder="Search"
            id="search-box"
            searchAsYouType={false}
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
                  viewBox="0 0 9.698 20.856"
                  className={classNames.submitIcon}
                >
                  <path
                    id="Polygon_3"
                    data-name="Polygon 3"
                    d="M0,8.659,10.1,0l10.1,8.659"
                    transform="translate(9.039 0.325) rotate(90)"
                    fill="none"
                    stroke="#747474"
                    stroke-width="1"
                  />
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
                  attribute="searchCategory"
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
                      <BsArrowLeft></BsArrowLeft> Previous page
                    </button>
                  ),
                  nextPageItemText: (
                    <button
                      onClick={() => window.scrollTo(0, 0)}
                      className={styles.searchNext}
                    >
                      Next page <BsArrowRight></BsArrowRight>
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
    </Layout>
  )
}

export const Head = () => <Seo title="Search" />

export default Search
