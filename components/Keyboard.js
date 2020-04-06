import React from 'react'
import '../styles/sass/keyboard.scss'

const keysQwerty = `${'`~ 1! 2@ 3# 4$ 5% 6^ 7& 8* 9( 0) -_ =+ (backspace) ' +
	'(tab) q w e r t y u i o p [{ ]} \\| ' +
	'(capslock) a s d f g h j k l ;: \'" (enter) ' +
	'(shift-left) z x c v b n m ,< .> /? (shift-right)'}`.split(' ')

const keys = keysQwerty

const Keyboard = () => {
	return (
		<div>
			<div className="keyboard-container">
				<div className="keyboard">
					{keys.map((key) => {
						if (/\(.*\)/.exec(key)) {
							key = key.slice(1, -1)
							return (
								<div data-key={key} className={`key is-${key}`}>
									{key === '(backspace)' ? (
										<div className="key__bottom">&larr;</div>
									) : key === '(enter)' ? (
										<div className="key__bottom">&#8629;</div>
									) : (
										<div className="key__bottom">{key}</div>
									)}
								</div>
							)
						} else if (key.length > 1) {
							key.split('')
							const [ bottomKey, topKey ] = key
							return (
								<div data-key={bottomKey} data-alt-key={topKey} className="key">
									<div className="key__top">{topKey}</div>
									<div className="key__bottom">{bottomKey}</div>
								</div>
							)
						} else {
							return (
								<div data-key={key} className="key">
									{key.toUpperCase()}
								</div>
							)
						}
					})}
				</div>
			</div>
		</div>
	)
}

export default Keyboard
