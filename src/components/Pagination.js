import React from "react";
import styled from "styled-components";

const Pagination = ({ page, setPage, numOfPages }) => {
	const handlePageChange = (selectedPage) => {
		if (selectedPage >= 1 && selectedPage <= numOfPages) {
			setPage(selectedPage);
		}
	};

	return (
		<PaginationContainer>
			<ArrowButton
				disabled={page === 1}
				onClick={() => {
					handlePageChange(page - 1);
				}}
			>
				&lt;
			</ArrowButton>
			{Array.from({ length: numOfPages }, (_, i) => (
				<PageNumber
					key={i}
					onClick={() => setPage(i + 1)}
					$active={page === i + 1}
				>
					{i + 1}
				</PageNumber>
			))}
			<ArrowButton
				disabled={page === numOfPages}
				onClick={() => {
					handlePageChange(page + 1);
				}}
			>
				&gt;
			</ArrowButton>
		</PaginationContainer>
	);
};

export default Pagination;

const PaginationContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const PageNumber = styled.button`
	background: none;
	border: none;
	padding: 0.5rem 1rem;
	margin: 0 0.25rem;
	cursor: pointer;
	text-decoration: ${({ $active }) => ($active ? "underline" : "none")};
	&:hover {
		background-color: #ddd;
	}
`;

const ArrowButton = styled.button`
	background: none;
	border: none;
	padding: 0.5rem;
	margin-right: 0.5rem;
	cursor: pointer;
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
	pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;
