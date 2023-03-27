export function TextToType({ text = '', textIndex = 0 }) {
	const textArray = text.split('')
	return (
		<>
			{textArray.map((letter, index) => {
				if (index < textIndex)
					return <span className='prev letter'>{letter}</span>
				if (index === textIndex)
					return <span className='current letter'>{letter}</span>
				else return <span className='future letter'>{letter}</span>
			})}

			<style jsx>{`
				.letter {
					font-size: 1.2rem;
				}
				.current {
					color: var(--purple);
					border-bottom: 1px solid var(--purple);
				}
				.future {
					color: #000;
				}
				.prev {
					color: #aaa;
				}
			`}</style>
		</>
	)
}
