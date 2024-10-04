{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem
    (
      system: let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
        with pkgs; {
          devShells.default = mkShell {
            buildInputs = with pkgs; [
              nodejs_22
              (python3.withPackages (ps:
                with ps; [
                  jupyter-server
                  ipykernel
                ]))
              texliveMedium
              libwebp
              imagemagick
              hatch
            ];
          };
        }
    );
}
