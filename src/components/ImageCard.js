import React from "react";
import styled from "styled-components";

const ImageCard = ({ imgData = {}, onClick }) => {
	const { photoUrl, tags = [] } = imgData;
	return (
		<Card onClick={onClick}>
			<Image src={photoUrl} alt="photo" />
			<Tags>
				{tags.map((tag, index) => (
					<Tag key={index}>{tag}</Tag>
				))}
			</Tags>
		</Card>
	);
};

export default ImageCard;

const Card = styled.div`
	border: 1px solid #ddd;
	border-radius: 4px;
	overflow: hidden;
	margin: 1rem;
	cursor: pointer;
	width: 220px;
`;

const Image = styled.img`
	width: 100%;
	height: 150px;
	object-fit: cover;
`;

const Tags = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 0.5rem;
`;

const Tag = styled.span`
	background-color: #eee;
	border-radius: 4px;
	padding: 0.25rem 0.5rem;
	margin: 0.25rem;
	font-size: 0.75rem;
`;
