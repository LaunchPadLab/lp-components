# set up heroku things
yarn run storybook:build
echo '{}' > composer.json
echo '<?php header( 'Location: /storybook-static/index.html' ); ?>' > index.php
