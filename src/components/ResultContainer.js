import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImageModal from "./ImageModal";
import ImageCard from "./ImageCard";

const ResultContainer = ({ currentData, dummyData }) => {
	const [currentImageDetail, setCurrentImageDetail] = useState(null);
	const [numOfColumns, setNumOfColumns] = useState(4);

	// 화면 크기가 변경될 때마다 열의 개수를 업데이트
	useEffect(() => {
		const updateColumns = () => {
			const screenWidth = window.innerWidth;
			if (screenWidth >= 1024) {
				setNumOfColumns(4);
			} else if (screenWidth >= 768) {
				setNumOfColumns(3);
			} else {
				setNumOfColumns(2);
			}
		};

		// 페이지 로드 및 화면 크기 변경 시 이벤트 추가
		window.addEventListener("resize", updateColumns);
		updateColumns(); // 컴포넌트가 마운트될 때 초기 열 개수 설정

		// 컴포넌트 언마운트 시 이벤트 제거
		return () => {
			window.removeEventListener("resize", updateColumns);
		};
	}, []);

	return (
		<Container>
			{currentImageDetail && (
				<ImageModal
					currentImageDetail={currentImageDetail}
					setCurrentImageDetail={setCurrentImageDetail}
					images={dummyData}
				/>
			)}
			<ResultsWrapper $columns={numOfColumns}>
				{currentData.map((imgData, idx) => (
					<ImageCard
						key={`${imgData.id}${idx}`}
						imgData={imgData}
						onClick={() => setCurrentImageDetail(imgData)}
					/>
				))}
			</ResultsWrapper>
		</Container>
	);
};

export default ResultContainer;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ResultsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
	gap: 0.5rem;
	width: 100%;
	max-width: 100vw;

	@media (max-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
		gap: 0.25rem;
		padding: 0.5rem;
		box-sizing: border-box;
	}

	@media (max-width: 480px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;
