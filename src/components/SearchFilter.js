import React from "react";
import styled from "styled-components";

const SearchFilter = ({ dummyData, searchFilter, setSearchFilter }) => {
	const allTags = dummyData.reduce((acc, curr) => {
		return [...acc, ...curr.tags];
	}, []);
	const uniqueTags = Array.from(new Set(allTags));

	const addSearchTerm = (term) => {
		setSearchFilter((prev) => [...prev, term]);
	};

	const removeSearchTerm = (term) => {
		setSearchFilter((prev) => prev.filter((item) => item !== term));
	};

	const handleTagClick = (tag) => {
		if (searchFilter.includes(tag)) {
			removeSearchTerm(tag);
		} else {
			addSearchTerm(tag);
		}
	};

	return (
		<Container>
			<Tag>
				{uniqueTags.map((tag, index) => (
					<TagItem
						key={index}
						onClick={() => handleTagClick(tag)}
						selected={searchFilter.includes(tag)}
					>
						{tag}
					</TagItem>
				))}
			</Tag>
			<Filter>
				{searchFilter.map((term, index) => (
					<FilterItem key={index}>
						<span>{term}</span>
						<button onClick={() => removeSearchTerm(term)}>
							X
						</button>
					</FilterItem>
				))}
			</Filter>
		</Container>
	);
};

export default SearchFilter;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem;
	width: 80%;
`;

const Tag = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 10px;
`;

const TagItem = styled.span`
	background-color: ${({ selected }) => (selected ? "#282c34" : "#eee")};
	color: ${({ selected }) => (selected ? "#fff" : "#000")};
	border-radius: 4px;
	padding: 4px 8px;
	margin: 4px;
	cursor: pointer;
`;

const Filter = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 2rem;
`;

const FilterItem = styled.div`
	background-color: #f8f9fa;
	padding: 0.3rem 0.5rem;
	border-radius: 20px;
	display: flex;
	align-items: center;
	font-size: 12px;
	color: #495057;
	border: 1px solid #ced4da;
	button {
		margin-top: 1px;
		font-size: 10px;
		font-weight: bold;
		color: #495057;
		background: none;
		border: none;
		cursor: pointer;
	}
`;
