const publicationData = Array.isArray(window.PUBLICATIONS)
  ? window.PUBLICATIONS
  : [];

const publicationRecord = document.getElementById("full-publication-record");
const publicationStatus = document.getElementById("publication-results-status");
const publicationEmptyState = document.getElementById("publication-empty-state");
const publicationControls = document.getElementById("publication-controls");
const publicationSearch = document.getElementById("publication-search");
const publicationYear = document.getElementById("publication-year");
const publicationSort = document.getElementById("publication-sort");
const publicationYearNav = document.getElementById("publication-year-nav");
const uniquePublicationCount = document.getElementById("unique-publication-count");

function normalizeSearchText(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase();
}

function publicationSearchText(publication) {
  return normalizeSearchText(
    [
      publication.title,
      publication.authors,
      publication.details,
      publication.year,
      publication.sourceNumbers.join(" "),
    ].join(" "),
  );
}

function createNameHighlightedText(textValue) {
  const fragment = document.createDocumentFragment();
  const parts = textValue.split(/(Rao Muhammad Anwer)/g);

  parts.forEach((part) => {
    if (part === "Rao Muhammad Anwer") {
      const strong = document.createElement("strong");
      strong.textContent = part;
      fragment.append(strong);
    } else {
      fragment.append(document.createTextNode(part));
    }
  });

  return fragment;
}

function createPublicationEntry(publication) {
  const item = document.createElement("article");
  item.className = "full-publication-entry";

  const source = document.createElement("span");
  source.className = "publication-source-number";
  source.textContent =
    publication.sourceNumbers.length > 1
      ? `#${publication.sourceNumbers.join(" & #")}`
      : `#${publication.sourceNumbers[0]}`;

  const content = document.createElement("div");

  const title = document.createElement("h3");
  title.textContent = publication.title;

  const authors = document.createElement("p");
  authors.className = "publication-authors";
  authors.append(createNameHighlightedText(publication.authors));

  const details = document.createElement("p");
  details.className = "publication-details";
  details.textContent = publication.details;

  content.append(title, authors, details);
  item.append(source, content);

  return item;
}

function updateYearNavigation(years) {
  publicationYearNav.replaceChildren();

  years.forEach((yearValue) => {
    const link = document.createElement("a");
    link.href = `#publications-${yearValue}`;
    link.textContent = String(yearValue);
    publicationYearNav.append(link);
  });

  publicationYearNav.hidden = years.length < 2;
}

function renderPublications() {
  const query = normalizeSearchText(publicationSearch.value.trim());
  const selectedYear = publicationYear.value;
  const order = publicationSort.value;

  const matchingPublications = publicationData
    .filter((publication) => {
      const matchesYear =
        selectedYear === "all" || String(publication.year) === selectedYear;
      const matchesQuery =
        !query || publicationSearchText(publication).includes(query);
      return matchesYear && matchesQuery;
    })
    .sort((first, second) => {
      const yearDifference =
        order === "oldest"
          ? first.year - second.year
          : second.year - first.year;

      if (yearDifference !== 0) {
        return yearDifference;
      }

      return first.sourceNumbers[0] - second.sourceNumbers[0];
    });

  const groups = new Map();

  matchingPublications.forEach((publication) => {
    if (!groups.has(publication.year)) {
      groups.set(publication.year, []);
    }
    groups.get(publication.year).push(publication);
  });

  const fragment = document.createDocumentFragment();

  groups.forEach((publications, yearValue) => {
    const section = document.createElement("section");
    section.className = "publication-year-group";
    section.id = `publications-${yearValue}`;

    const header = document.createElement("header");
    const heading = document.createElement("h2");
    heading.textContent = String(yearValue);

    const count = document.createElement("span");
    count.textContent = `${publications.length} ${
      publications.length === 1 ? "publication" : "publications"
    }`;

    header.append(heading, count);

    const list = document.createElement("div");
    list.className = "full-publication-list";
    publications.forEach((publication) => {
      list.append(createPublicationEntry(publication));
    });

    section.append(header, list);
    fragment.append(section);
  });

  publicationRecord.replaceChildren(fragment);
  publicationRecord.setAttribute("aria-busy", "false");
  publicationEmptyState.hidden = matchingPublications.length !== 0;

  const resultLabel =
    matchingPublications.length === publicationData.length
      ? `Showing all ${matchingPublications.length} publications`
      : `Showing ${matchingPublications.length} of ${publicationData.length} publications`;
  publicationStatus.textContent = resultLabel;

  updateYearNavigation([...groups.keys()]);
}

function initializePublicationBrowser() {
  if (
    !publicationRecord ||
    !publicationControls ||
    !publicationSearch ||
    !publicationYear ||
    !publicationSort ||
    !publicationYearNav
  ) {
    return;
  }

  const years = [...new Set(publicationData.map(({ year: yearValue }) => yearValue))]
    .sort((first, second) => second - first);

  years.forEach((yearValue) => {
    const count = publicationData.filter(
      (publication) => publication.year === yearValue,
    ).length;
    const option = document.createElement("option");
    option.value = String(yearValue);
    option.textContent = `${yearValue} (${count})`;
    publicationYear.append(option);
  });

  if (uniquePublicationCount) {
    uniquePublicationCount.textContent = String(publicationData.length);
  }

  publicationControls.addEventListener("input", renderPublications);
  publicationControls.addEventListener("change", renderPublications);
  publicationControls.addEventListener("reset", () => {
    window.requestAnimationFrame(renderPublications);
  });

  renderPublications();
}

initializePublicationBrowser();
