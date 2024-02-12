const gulp = require('gulp');
const twig = require('gulp-twig');

const twigSource = 'source/twig/**/*.twig';
const buildDir = './build';

const RecImageOptions = [
  'https://brandportal.umd.edu/m/7be4cb700f7b7518/Hero_web-KnoxMural_06042018_8081.jpg',
  'https://brandportal.umd.edu/m/226baa823376ccd2/original/CommencementVirtualBackgrounds_UMD_0001-JPG.png',
  'https://brandportal.umd.edu/m/7ba14bfbef057298/Hero_web-221008_as_fb_purdue_00024-Final-tif.jpg',
  'https://brandportal.umd.edu/m/32a10cb61438d320/Hero_web-PaintBranchBridge_Lights_07152018_6745_Final.jpg',
  'https://brandportal.umd.edu/m/5575d79a05956663/Hero_web-AntietamBlush_Harvesting_10302018_2825_edit.jpg',
  'https://brandportal.umd.edu/m/745a4beb711b75f8/Hero_web-Mall_09112017_2982-tif.jpg',
  'https://brandportal.umd.edu/m/36b2e06f0db27eda/Hero_web-IribeDedication_MM_04272019_6208.jpg',
  'https://brandportal.umd.edu/m/55565fbba3b510d6/Hero_web-Campus_Snow_01032022_JC_8215.jpg',
  'https://brandportal.umd.edu/m/2af0dd6b6ef78a48/Hero_web-Students_Outdoors_02052019_7673.jpg',
  'https://brandportal.umd.edu/m/3b312bf001fda9f3/Hero_web-DriskellCenter_PosingBeauty_SC_02012019_4311.jpg',
  'https://brandportal.umd.edu/m/4f2058b2174fdcfc/Hero_web-Campus_Snow_02202019_3724.jpg',
  'https://brandportal.umd.edu/m/25a6294e01fab473/Hero_web-Students_ESJLTC_07282020_EH_1593.jpg',
  'https://brandportal.umd.edu/m/763f805f9e280e6a/Hero_web-Students_Mall_09192019_0744-tif.jpg',
];

const SquareImageOptions = [
  'https://brandportal.umd.edu/m/20eb228a112cb1d3/Square-Students_Outdoors_09292017_7118.jpg',
  'https://brandportal.umd.edu/m/28973b679519d5c9/Square-HornbakeLibrary_03082023_HH_1859.jpg',
  'https://brandportal.umd.edu/m/8ffda3d340165e1/Square-Campus_Fall_11012022_JC_6055-JPG.jpg',
];

const WeirdImageOptions = [
  'https://brandportal.umd.edu/m/45baf65f957027a8/Hero_web-Campus_Fall_11012022_JC_5990.jpg',
  'https://brandportal.umd.edu/m/13da92f7a9906748/Hero_web-Students_Outdoors_04052023_HH_2696.jpg',
  'https://brandportal.umd.edu/m/4f1c9589ac5fa49d/Hero_web-Students_ESJLTC_03292023_SC_5429.jpg',
];

const logoOptions = [
  'https://brandportal.umd.edu/m/139cd2d64cbb69cd/Medium_web-SPP_DGI_Primary_rgb-png.jpg',
];

const twigTask = () =>
  gulp
    .src(twigSource)
    .pipe(
      twig({
        data: {
          RecImageOptions,
          SquareImageOptions,
          WeirdImageOptions,
          logoOptions,
        },
      }),
    )
    .pipe(gulp.dest(buildDir));

exports.default = gulp.series(twigTask);
