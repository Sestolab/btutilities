CKEDITOR.plugins.add('btutilities', {
	requires: 'menubutton,smethods',
	lang: 'en,ru,uk',
	icons: 'btutilities',

	init: function(editor){
		var lang = editor.lang.btutilities,
			menuItems = function(element){
				var items = {};

				if (element.isReal('iframe', 'embed', 'video', 'object'))
					items.btutilitiesEmbed = CKEDITOR.TRISTATE_OFF;
				items.btutilitiesBorders = items.btutilitiesDisplay = items.btutilitiesShadows = items.btutilitiesOverflow =
				items.btutilitiesSR = items.btutilitiesVisibility = items.btutilitiesPosition = items.btutilitiesSizing =
				items.btutilitiesSpacing = items.btutilitiesVA = items.btutilitiesFloat = items.btutilitiesText = CKEDITOR.TRISTATE_OFF;
				return CKEDITOR.tools.object.merge(items, generateItems('', [element.is('a') && 'stretched-link', 'clearfix'],
					(function(iname, e){e.toggleClass(iname)}))
				);
			};

		editor.on('instanceReady', function(){
			CKEDITOR.tools.array.forEach(editor.element.find('.embed-responsive img').toArray(), function(img){
				img.addClass('embed-responsive-item');
			});
		});

		editor.addMenuGroup('btutilities');

		editor.addMenuItems({
			btutilitiesDisplay: {
				label: lang.display,
				group: 'btutilities',
				getItems: function(){
					var d = ['none', 'inline', 'inline-block', 'block', 'table', 'table-cell', 'table-row', 'flex', 'inline-flex'];
					editor.addMenuItems({
						dscreen: {
							label: lang.dscreen,
							group: 'btutilities',
							getItems: function(){
								return generateItems('d-', d,
									(function(iname, e){e.toggleClass(iname, /\bd-(none|inline|table)?-?(block|cell|row|flex)?(?=\s|$)/g)}),
								);
							}
						},
						dprint: {
							label: lang.dprint,
							group: 'btutilities',
							getItems: function(){
								return generateItems('d-print-', d,
									(function(iname, e){e.toggleClass(iname, /\bd-print-(none|inline|table)?-?(block|cell|row|flex)?(?=\s|$)/g)}),
								);
							}
						}
					});
					return {
						dscreen: CKEDITOR.TRISTATE_OFF,
						dprint: CKEDITOR.TRISTATE_OFF,
						btutilitiesFlex: CKEDITOR.TRISTATE_OFF
					};
				}
			},
			btutilitiesShadows: {
				label: lang.shadow,
				group: 'btutilities',
				getItems: function(){
					return generateItems('shadow-', ['none', 'sm', 'shadow', 'lg'],
						(function(iname, e){e.toggleClass(iname, /shadow?[^\s]+/g)}), '', [2]
					);
				}
			},
			btutilitiesOverflow: {
				label: lang.overflow,
				group: 'btutilities',
				getItems: function(){
					return generateItems('overflow-', ['auto', 'hidden'],
						(function(iname, e){e.toggleClass(iname, /overflow-[^\s]+/)}),
					);
				}
			},
			btutilitiesSR: {
				label: lang.sr,
				group: 'btutilities',
				getItems: function(){
					return generateItems('sr-', ['only', 'only-focusable'],
						(function(iname, e){e.toggleClass(iname)}), {rm: '-only'}
					);
				}
			},
			btutilitiesVisibility: {
				label: lang.visibility,
				group: 'btutilities',
				getItems: function(){
					return generateItems('', ['visible', 'invisible'],
						(function(iname, e, names){e.toggleClass(iname, names)}),
					);
				}
			},
			btutilitiesPosition: {
				label: lang.position,
				group: 'btutilities',
				getItems: function(){
					return generateItems('position-', ['static', 'relative', 'absolute', 'fixed', 'sticky', 'fixed-top', 'fixed-bottom', 'sticky-top'],
						(function(iname, e){e.toggleClass(iname, /(?=position-|fixed-|sticky-)[^\s]+/g)}), '', [5,6,7]
					);
				}
			},
			btutilitiesSizing: {
				label: lang.sizing,
				group: 'btutilities',
				getItems: function(){
					var sizes = {
							width: ['w-25', 'w-50', 'w-75', 'w-100', 'w-auto', 'mw-100', 'vw-100', 'min-vw-100'],
							height: ['h-25', 'h-50', 'h-75', 'h-100', 'h-auto', 'mh-100', 'vh-100', 'min-vh-100']
						},
						items = {};
					for (var i in sizes){
						editor.addMenuItem(i, {
							label: lang[i],
							group: 'btutilities',
							getItems : function(){
								return generateItems('', sizes[this.name],
									(function(iname, e, names){e.toggleClass(iname, names)}),
									{rm: /^[wh]-/, alt: (function(name){return name.replace(/^[wh]-/, '')+'%'})}
								);
							}
						});
						items[i] = CKEDITOR.TRISTATE_OFF;
					}
					return items;
				}
			},
			btutilitiesSpacing: {
				label: lang.spacing,
				group: 'btutilities',
				getItems: function(){
					var spacing = {
							margin: ['0', '1', '2', '3', '4', '5', 'n1', 'n2', 'n3', 'n4', 'n5', 'auto'],
							padding: ['0', '1', '2', '3', '4', '5']
						},
						items = {};
					for (var i in spacing){
						editor.addMenuItem(i, {
							label: lang[i],
							group: 'btutilities',
							getItems : function(){
								return generateItems(this.name.charAt(0)+'-', spacing[this.name],
									(function(iname, e, names){e.toggleClass(iname, new RegExp(iname.charAt(0)+'-('+names.join('|')+')'))}),
									{alt: (function(name){return name.replace('n', '-')})}
								);
							}
						});
						items[i] = CKEDITOR.TRISTATE_OFF;
					}
					return items;
				}
			},
			btutilitiesBorders: {
				label: lang.border,
				group: 'btutilities',
				getItems: function(){
					var borders = {
							additive: ['border', 'top', 'right', 'bottom', 'left'],
							subtractive: ['0', 'top-0', 'right-0', 'bottom-0', 'left-0'],
							bcolors: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'white'],
							bradius: ['sm', 'rounded', 'lg', 'top', 'right', 'bottom', 'left', 'circle', 'pill', '0']
						},
						items = {};
					for (var i in borders){
						editor.addMenuItem(i, {
							label: lang[i],
							group: 'btutilities',
							getItems : function(){
								return generateItems(this.name == 'bradius' ? 'rounded-' : 'border-', borders[this.name],
									(function(iname, e, names){e.toggleClass(iname, [ iname.includes('-0') ? iname.replace('-0', '') : iname + '-0' ])}),
									{rm: '-0'}, [(this.name == 'bradius' && 1) || (this.name == 'additive' && 0)]
								);
							}
						});
						items[i] = CKEDITOR.TRISTATE_OFF;
					}
					return items;
				}
			},
			btutilitiesVA: {
				label: lang.VA,
				group: 'btutilities',
				getItems: function(){
					return generateItems('align-', ['baseline', 'top', 'middle', 'bottom', 'text-bottom', 'text-top'],
						(function(iname, e){e.toggleClass(iname, /align-(?=baseline|top|middle|bottom|text-)[^\s]+/g)}),
					);
				}
			},
			btutilitiesEmbed: {
				label: lang.embed,
				group: 'btutilities',
				getItems: function(){
					return generateItems('embed-responsive-', ['21by9', '16by9', '4by3', '1by1'],
						(function(iname, element){
							var relement = editor.restoreRealElement(element),
								embed = element.getParent().hasClass('embed-responsive') ? element.getParent() : editor.document.createElement('div');
							if (element.getParent().hasClass(iname)){
								element.getParent().remove();
								relement.removeClass('embed-responsive-item');
								editor.insertElement(element);
							}else
								if (embed.hasClass('embed-responsive'))
									embed.toggleClass(iname, /embed-responsive-\d+by\d/g);
							else{
								embed.addClass('embed-responsive').addClass(iname);
								element.addClass('embed-responsive-item');
								relement.addClass('embed-responsive-item').removeAttribute('frameborder');
								embed.append(element);
								editor.insertElement(embed);
							}
							editor.createFakeElement(relement, element.getAttribute('class'), relement.getName(), true).replace(element);
						}),
						{alt: (function(name){return name.replace('by', ':')})}
					);
				}
			},
			btutilitiesFloat: {
				label: lang.float,
				group: 'btutilities',
				getItems: function(){
					return generateItems('float-', ['left', 'right', 'none'],
						(function(iname, e){e.toggleClass(iname, /float-(left|right|none)/g)}),
					);
				}
			},
			btutilitiesFlex: {
				label: lang.flex,
				group: 'btutilities',
				getItems: function(){
					var flex = {
							flex_direction: ['flex-row', 'flex-row-reverse', 'flex-column', 'flex-column-reverse'],
							justify_content: ['justify-content-start', 'justify-content-end', 'justify-content-center', 'justify-content-between', 'justify-content-around'],
							align_items: ['align-items-start', 'align-items-end', 'align-items-center', 'align-items-baseline', 'align-items-stretch'],
							align_self: ['align-self-start', 'align-self-end', 'align-self-center', 'align-self-baseline', 'align-self-stretch'],
							wrap: ['flex-wrap', 'flex-nowrap', 'flex-wrap-reverse'],
							align_content: ['align-content-start', 'align-content-end', 'align-content-center', 'align-content-around', 'align-content-stretch'],
							grow_shrink: ['flex-grow-0', 'flex-grow-1', 'flex-shrink-0', 'flex-shrink-1'],
							order: [...new Array(13)].map(function(e, i){ return 'order-'+i; })
						},
						items= {};

					for (var i in flex){
						editor.addMenuItem(i, {
							label: lang[i],
							group: 'btutilities',
							getItems: function(){
								return generateItems('', flex[this.name],
									(function(iname, e, names){e.toggleClass(iname, names)}),
									{rm: /(flex-(wrap-)?)|(d-)|(justify-content-)|(align-.*-)/, alt: (function(name){return name.replace('order-', '')})}
								);
							}
						});
						items[i] = CKEDITOR.TRISTATE_OFF;
					}
					return CKEDITOR.tools.object.merge(items, generateItems('d-', ['flex-fill'],
						(function(iname, e){e.toggleClass(iname)})
					));
				}
			},
			btutilitiesText: {
				label: lang.text,
				group: 'btutilities',
				getItems: function(){
					var text = {
							text_wrap: ['wrap', 'nowrap', 'truncate'],
							text_transform: ['lowercase', 'uppercase', 'capitalize'],
							font_weight: ['bold', 'bolder', 'normal', 'light', 'lighter', 'font-italic']
						},
						items = {};
					for (var i in text){
						editor.addMenuItem(i, {
							label: lang[i.replace('text_', '')],
							group: 'btutilities',
							getItems: function(){
								return generateItems(this.name.replace(/_(wrap|transform)/g, '').replace('_', '-')+'-', text[this.name],
									(function(iname, e, names){e.toggleClass(iname, new RegExp(iname.replace(/\w+$/, '')+'('+names.join('|')+')\\b', 'g'))}),
									{rm: 'font-'}, [5]
								);
							}
						});
						items[i] = CKEDITOR.TRISTATE_OFF;
					}
					return CKEDITOR.tools.object.merge(items, generateItems('text-', ['break', 'monospace', 'decoration-none'],
						(function(iname, e){e.toggleClass(iname)})
					));
				}
			}
		});

		editor.ui.addMenuButton('btutilities', {
			label: lang.buttonLabel,
			modes: { wysiwyg: 1 },
			onMenu: menuItems
		});

		if (editor.contextMenu)
			editor.contextMenu.addListener(menuItems);

		CKEDITOR.document.appendStyleSheet(this.path + 'css/btutilities.css');

		CKEDITOR.config.justifyClasses = ['text-left', 'text-center', 'text-right', 'text-justify'];


		function generateItems(prefix, names, command, label, noprefix){
			var element = editor.getSelection().getStartElement(),
				items = {};
			for (var name of names){
				if (!name)
					continue;
				var cname = (!(noprefix && noprefix.indexOf(names.indexOf(name)) != -1)) ? prefix + name : name;
				editor.addCommand(cname, {
					exec: function(){
						command(this.name, element, names);
					}
				});
				editor.addMenuItem(cname, {
					label: (lang[prepareLabel(name, label)] || lang[prepareLabel(cname, label)] || label.alt(name)),
					group: 'btutilities',
					command: cname
				});
				items[cname] = (prefix != 'embed-responsive-' ? !element.hasClass(cname) : !element.getParent().hasClass(cname)) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_ON;
			}
			return items;
		}

		function prepareLabel(name, label){
			return name.replace((label && label.rm), '').replace(/-/g, '_');
		}

	}
});

