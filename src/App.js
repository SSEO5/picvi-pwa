import { useEffect, useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import dummyData from "./assets/dummyData";
import { ResultContainer, SearchFilter } from "./components";
import Pagination from "./components/Pagination";
import "./App.css";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) =>
		theme.mode === "light"
			? "var(--bg-color-light)"
			: "var(--bg-color-dark)"};
  }
`;

const useTheme = () => {
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "light"
	);

	useEffect(() => {
		localStorage.setItem("theme", theme);
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
	};

	return [theme, toggleTheme];
};

const useFilteredData = (searchFilter, dummyData) => {
	const [filteredData, setFilteredData] = useState(dummyData);

	useEffect(() => {
		const filteredData = searchFilter.length
			? dummyData.filter((item) =>
					searchFilter.every((term) => item.tags.includes(term))
			  )
			: dummyData;
		setFilteredData(filteredData);
	}, [searchFilter, dummyData]);

	return filteredData;
};

function App() {
	const [page, setPage] = useState(1);
	const perPage = 8;
	const [searchFilter, setSearchFilter] = useState([]);
	const [theme, toggleTheme] = useTheme();

	const filteredData = useFilteredData(searchFilter, dummyData);
	const currentData = filteredData.slice(
		(page - 1) * perPage,
		page * perPage
	);

	const numOfPages = Math.ceil(filteredData.length / perPage);

	useEffect(() => {
		setPage(1);
	}, [searchFilter]);

	return (
		<ThemeProvider theme={{ mode: theme }}>
			<GlobalStyle />
			<Header>
				<Title>Image Viewer</Title>
			</Header>
			<Container>
				<SearchFilter
					dummyData={dummyData}
					searchFilter={searchFilter}
					setSearchFilter={setSearchFilter}
				/>
				<ResultContainer
					currentData={currentData}
					dummyData={dummyData}
				/>
				<PaginationWrapper>
					<Pagination
						page={page}
						setPage={setPage}
						numOfPages={numOfPages}
					/>
				</PaginationWrapper>
				<ToggleThemeButton onClick={toggleTheme}>
					{theme === "light" ? <MdLightMode /> : <MdDarkMode />}
				</ToggleThemeButton>
			</Container>
			<Footer />
		</ThemeProvider>
	);
}

export default App;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	align-items: center;
`;

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 1rem;
	background-color: #282c34;
	color: white;
`;

const Title = styled.h1`
	font-size: 1.5rem;
`;

const Footer = styled.footer`
	padding: 1rem;
	background-color: #282c34;
	color: white;
	text-align: center;
	margin-top: auto;
`;

const PaginationWrapper = styled.div`
	display: flex;
	justify-content: center;
	padding: 2rem 0;
`;

const ToggleThemeButton = styled.button`
	position: fixed;
	bottom: 1rem;
	right: 1rem;
	padding: 0.5rem 1rem;
	background-color: ${({ theme }) =>
		theme.mode === "light" ? "#61dafb" : "#000"};
	color: ${({ theme }) => (theme.mode === "light" ? "#000" : "#fff")};
	border: none;
	border-radius: 0.25rem;
	cursor: pointer;
`;
