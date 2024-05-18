import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { RxEnterFullScreen } from "react-icons/rx";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuRotateCcw, LuRotateCw } from "react-icons/lu";
import { TbArrowsHorizontal, TbArrowsVertical } from "react-icons/tb";
import { RxZoomIn, RxZoomOut } from "react-icons/rx";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { FaFileArrowDown } from "react-icons/fa6";
import { PiClockCounterClockwiseThin } from "react-icons/pi";

const ImageModal = ({ currentImageDetail, setCurrentImageDetail, images }) => {
	const [zoomLevel, setZoomLevel] = useState(1);
	const [rotationAngle, setRotationAngle] = useState(0);
	const [isHorizontalFlipped, setHorizontalFlipped] = useState(false);
	const [isVerticalFlipped, setVerticalFlipped] = useState(false);
	const imageRef = useRef(null);

	const { id, photoUrl, tags } = currentImageDetail;

	// 모달 바깥 스크롤 방지
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	useEffect(() => {
		const handleWheel = (event) => {
			if (event.ctrlKey) {
				event.preventDefault();
				if (event.deltaY < 0) {
					setZoomLevel((prevZoomLevel) =>
						Math.min(prevZoomLevel + 0.1, 3)
					);
				} else {
					setZoomLevel((prevZoomLevel) =>
						Math.max(prevZoomLevel - 0.1, 0.1)
					);
				}
			}
		};
		const handleGestureChange = (event) => {
			event.preventDefault();
			setZoomLevel((prevZoomLevel) =>
				Math.max(0.1, Math.min(3, prevZoomLevel * event.scale))
			);
		};

		const imageContainer = imageRef.current;
		if (imageContainer) {
			imageContainer.addEventListener("wheel", handleWheel);
			imageContainer.addEventListener(
				"gesturechange",
				handleGestureChange
			);
		}
		return () => {
			if (imageContainer) {
				imageContainer.removeEventListener("wheel", handleWheel);
				imageContainer.removeEventListener(
					"gesturechange",
					handleGestureChange
				);
			}
		};
	}, []);

	const handleZoomChange = (event) => {
		const value = parseFloat(event.target.value);
		setZoomLevel(isNaN(value) ? 1 : value);
	};
	const handleZoomIn = () => {
		setZoomLevel((prevZoomLevel) => prevZoomLevel + 0.1);
	};
	const handleZoomOut = () => {
		setZoomLevel((prevZoomLevel) => Math.max(0.1, prevZoomLevel - 0.1));
	};

	const handleRotateLeft = () => {
		setRotationAngle((prevRotationAngle) => prevRotationAngle - 90);
	};
	const handleRotateRight = () => {
		setRotationAngle((prevRotationAngle) => prevRotationAngle + 90);
	};

	const handleSaveImage = () => {
		const link = document.createElement("a");
		link.href = photoUrl;
		link.download = `image_${id}`;
		link.click();
	};

	const handleFullScreen = () => {
		if (imageRef.current) {
			if (imageRef.current.requestFullscreen) {
				imageRef.current.requestFullscreen();
			} else if (imageRef.current.mozRequestFullScreen) {
				imageRef.current.mozRequestFullScreen();
			} else if (imageRef.current.webkitRequestFullscreen) {
				imageRef.current.webkitRequestFullscreen();
			} else if (imageRef.current.msRequestFullscreen) {
				imageRef.current.msRequestFullscreen();
			}
		}
	};

	const handlePrevious = () => {
		const currentIndex = images.findIndex((image) => image.id === id);
		const previousIndex =
			(currentIndex - 1 + images.length) % images.length;
		setCurrentImageDetail(images[previousIndex]);
	};

	const handleNext = () => {
		const currentIndex = images.findIndex((image) => image.id === id);
		const nextIndex = (currentIndex + 1) % images.length;
		setCurrentImageDetail(images[nextIndex]);
	};

	const handleFlipHorizontal = () => {
		setHorizontalFlipped((prev) => !prev);
	};

	const handleFlipVertical = () => {
		setVerticalFlipped((prev) => !prev);
	};

	const handleReset = () => {
		setZoomLevel(1);
		setRotationAngle(0);
		setHorizontalFlipped(false);
		setVerticalFlipped(false);
	};

	const handleCloseModal = () => {
		setCurrentImageDetail(null);
		handleReset();
	};

	return (
		<ModalBackground onClick={handleCloseModal}>
			<ModalContent onClick={(e) => e.stopPropagation()}>
				<ModalTop>
					<IconButton onClick={handleCloseModal}>
						<IoIosCloseCircleOutline />
					</IconButton>
					<IconButton onClick={handleFullScreen}>
						<RxEnterFullScreen />
					</IconButton>
				</ModalTop>
				<ImageContainer ref={imageRef}>
					<StyledImage
						src={photoUrl}
						alt="photo"
						$zoomLevel={zoomLevel}
						$rotationAngle={rotationAngle}
						$isHorizontalFlipped={isHorizontalFlipped}
						$isVerticalFlipped={isVerticalFlipped}
					/>
				</ImageContainer>
				<Tags>
					{tags.map((tag, index) => (
						<Tag key={index}>{tag}</Tag>
					))}
				</Tags>
				<SliderContainer>
					<IconButton onClick={handleZoomOut}>
						<RxZoomOut />
					</IconButton>
					<Slider
						type="range"
						min="0.1"
						max="3"
						step="0.1"
						value={zoomLevel}
						onChange={handleZoomChange}
					/>
					<IconButton onClick={handleZoomIn}>
						<RxZoomIn />
					</IconButton>
				</SliderContainer>
				<NavigationButtons>
					<IconButton onClick={handlePrevious}>
						<HiChevronLeft />
					</IconButton>
					<IconButton onClick={handleRotateLeft}>
						<LuRotateCcw />
					</IconButton>
					<IconButton onClick={handleRotateRight}>
						<LuRotateCw />
					</IconButton>
					<IconButton onClick={handleFlipHorizontal}>
						<TbArrowsHorizontal />
					</IconButton>
					<IconButton onClick={handleFlipVertical}>
						<TbArrowsVertical />
					</IconButton>
					<IconButton onClick={handleSaveImage}>
						<FaFileArrowDown />
					</IconButton>
					<IconButton onClick={handleReset}>
						<PiClockCounterClockwiseThin />
					</IconButton>
					<IconButton onClick={handleNext}>
						<HiChevronRight />
					</IconButton>
				</NavigationButtons>
			</ModalContent>
		</ModalBackground>
	);
};

export default ImageModal;

const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ModalContent = styled.div`
	background-color: white;
	border-radius: 8px;
	padding: 50px;
	max-width: 65%;
	position: relative;
`;

const ModalTop = styled.div`
	position: absolute;
	top: 0px;
	left: 50%;
	transform: translateX(-50%);
	width: 95%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	cursor: pointer;
`;

const ImageContainer = styled.div`
	margin-top: 10px;
	overflow-y: auto;
	max-height: calc(100vh - 400px);
`;

const StyledImage = styled.img.attrs(
	({
		$zoomLevel,
		$rotationAngle,
		$isHorizontalFlipped,
		$isVerticalFlipped,
	}) => ({
		style: {
			transform: `scale(${$zoomLevel}) rotate(${$rotationAngle}deg)${
				$isHorizontalFlipped ? " scaleX(-1)" : ""
			}${$isVerticalFlipped ? " scaleY(-1)" : ""}`,
		},
	})
)`
	max-width: 100%;
	max-height: 100%;
	transition: transform 0.3s ease-in-out;
`;

const Tags = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 10px;
`;

const Tag = styled.span`
	background-color: #eee;
	border-radius: 4px;
	padding: 4px 8px;
	margin: 4px;
`;

const SliderContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 10px;
	cursor: pointer;
	font-size: 20px;
	gap: 5px;
`;

const Slider = styled.input`
	width: 30%;
`;

const NavigationButtons = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin-top: 20px;
`;

const IconButton = styled.div`
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #eee;
	border: 1px solid #ccc;
	border-radius: 8px;
	cursor: pointer;
	transition: background-color 0.3s, transform 0.3s;
	font-size: 18px;

	&:hover {
		background-color: #eee;
		transform: scale(1.1);
	}
`;
