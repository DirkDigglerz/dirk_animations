 
fx_version 'cerulean' 
lua54 'yes' 
games { 'rdr3', 'gta5' } 
author 'DirkScripts' 
description 'Clean Animations | Pause menu for FiveM'
version      '1.0.1' 

shared_script {
  '@clean_lib/init.lua',
}

client_script { 
  'src/client/*.lua',
} 

server_script { 
  'src/server/*.lua',
}
 

ui_page 'web/build/index.html'

files {
  'settings/*.lua',
	'web/build/index.html',
	'web/build/**/*',
}